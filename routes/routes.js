const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const keygen = require("keygenerator");
const passport = require("passport");
const user_auth = require("../controllers/user_authentication");
const otpDB = require("../controllers/otp");
const otpGenerator = require("otp-generator");
const validate = require("../controllers/joi_validation");

const key = "dZ9rcjxB2X45MXobcgPNEXgmPjHpfsVi";
app.post('/signup', (req, res) => {
 
    const payload = {
     "email":"",
     "password":""
    };
    payload.email  = req.body.email;
    payload.password = req.body.password;
   
    const validated = validate.validateSignUp(req.body.email, req.body.password);
    //console.log(validated);
    if(validated){
      User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
              });
              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "User created"
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
    }
    else{
      // 
      res.status(400).json({message:validated});
    }

    
  });
  app.post('/signin',(req, res, next) => {
    const validated = validate.validateSignIn(req.body.email, req.body.password);
    if(validated){
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Email does not exists"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Passwords don't match!"
            });
          }
          if (result) {
            const user_email = user[0].email;
            const userId = user[0]._id;
            const token = jwt.sign(
              {
                email: user_email,
                userId: userId,
              },
              key,
              {
                expiresIn: "1h"
              }
            );
            const otp_token = jwt.sign(
              {
                email: user_email,
                userId:  userId
              },
              key,
              {
                expiresIn: "15m"
              }
            );
          //  const otp_token = otpGen.generate(6, {digits:true, upperCase: false, specialChars: false, alphabets: false });  
          const OTP_GEN = user_auth.generateOTP();
          user_auth.sendmailOTP(user_email,OTP_GEN);
          otpDB.Otp_save(OTP_GEN,userId);
          user_auth.jwt_save(token,userId);
          return res.status(200).json({
              message: "Authentication successful",
              token: "Bearer "+ token,
              otp_token: "Bearer "+ otp_token,
              OTP:OTP_GEN,
              request: {
                type: "POST"}
            });
           
           
          }
          res.status(401).json({
            message: "Passwords don't match!",
            request: {
              type: "POST"}
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    }
    else{
       
      res.status(200).json({message:"not successful"});
    }
  });
  app.get('/protected',passport.authenticate("jwt", {session: false}),(req, res) =>{
    res.send("Accessed Protected route");
});
app.post('/forgot-password',(req, res)=>{
  const validated = validate.validateForgot(req.body.email);
  if(validated){
     //find user
  User.find({ email: req.body.email })
  .exec()
  .then(user => {
    if (user.length < 1) {
      return res.status(401).json({
        message: "Email does not exist"
      });
    }
  //create a JWT token
  const secret = key;
  const user_email = user[0].email;
  const userId = user[0]._id;
    const payload = {
        email:user_email,
        id:userId
    }
    const token = jwt.sign(payload, secret, {expiresIn: '15m'});
    const link = `http://localhost:3000/reset-passord/${user[0]._id}/${token}`;
    user_auth.sendResetLink(user_email,link);
    res.status(200).json({
      link: link,
      token: "Bearer "+ token,
    });
    
    //console.log(link);
    //res.send('Password reset link')
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
  }
  else{
     
    res.status(200).json({message:"not successful"});
  }
 
});
app.post('/reset-password',(req, res)=>{
  const validated = validate.validateReset(req.body.password,req.body.confirm_password);
  if(validated){
    try{
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, key);
      req.userData = decoded;
      console.log(decoded)
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err
          });
        } else {
          User.findByIdAndUpdate({_id:decoded.id},{"password": hash}, function(err, result){
    
            if(err){
              console.log(err);
                res.send(err)
            }
            else{
              console.log(result)
               res.send({
                result,
                message:"Reset password successful!"
               }
                )
            }
        });
        }
    
      });
     }
     catch{
      (err)=>{
        console.log(err);
      }
     }
  }
  else{
     
    res.status(200).json({message:"not successful"});
  }
 


});
app.post('/otp',(req, res)=>{
  const validated = validate.validateOtp(req.body.otp);
  if(validated){
    try{
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, key);
      req.userData = decoded;
      console.log(decoded)
      res.status(200).json(
        {
          "message":"OTP success",
          "status":"success"
        }
      );
    }
    catch{
      (err)=>{
        console.log(err);
        res.status(500).json(
          {
            "message":"OTP failed",
            "status":"failed"
          }
        );
      }
    }
  }
  else{
     
    res.status(200).json({message:"not successful"});
  }
  
});
app.post('/otpResend',(req, res)=>{
  const validated = validate.validateOtp(req.body);
  if(validated){
    User.find({ email: req.body.email })
.exec()
.then(user => {
  if (user.length < 1) {
    return res.status(401).json({
      message: "Auth failed"
    });
  }
  const user_email = user[0].email;
  const userId = user[0]._id;
  const secret = key;
  const OTP_GEN = user_auth.generateOTP();
  const payload = {
    email:user_email,
    id:userId
}
const otp_token = jwt.sign(payload, secret, {expiresIn: '1m'});
user_auth.sendmailOTP(user_email,OTP_GEN);
res.status(200).json({
  message: "OTP sent successful",
  otp_token: "Bearer "+ otp_token,
  OTP:OTP_GEN
});
})
.catch(
  (err)=>{
    console.log(err);
    res.status(500).json(
      {
        "message":"OTP failed",
        "status":"failed"
      }
    );
  }

);
  }
  else{
    res.status(200).json({message:"not successful"});
  }

});
//app.post("/otp_trial",otpDB.Otp_save(1254,"3dvdtdf6s"));
  module.exports = app;