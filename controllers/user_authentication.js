var nodemailer = require('nodemailer');
const mongoose = require("mongoose");

const Jwt = require("../models/jwt");
exports.jwt_save = (jwt_gen,user_receiving) => {
  const jwt = new Jwt({
      _id: mongoose.Types.ObjectId(),
      jwt: jwt_gen,
      user_id: user_receiving
    });
  jwt.save()
  .then(otp => {
    console.log("Successfully added JWT");
   /* res.status(200).json({
        "message":"success"
    });*/
  })
  .catch(err => {
    console.log("User with this JWT already exists");
   /* console.log(err);
    res.status(500).json({
      error: err
    });*/
  });
};
exports.remove_jwt = (user_id_passed)=> {
  Jwt.remove({ user_id: user_id_passed })
  .exec()
  .then(result => {
    console.log("Removing JWT was successful");

    /*
    res.status(200).json({
      message: "User deleted"
    });*/
  })
  .catch(err => {
    console.log("Removing JWT was unsuccessful");
    /*console.log(err);
    res.status(500).json({
      error: err
    });*/
  });
}
exports.generateOTP = ()=> {
          
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
exports.sendmailOTP = (mail, OTP) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'edmundopiyo@gmail.com',
          pass: 'ehmcevmbqwryapyh'
        }
      });
       const message = `Here is your Paylend OTP ${OTP}`
      var mailOptions = {
        from: 'edmundopiyo@gmail.com',
        to: mail,
        subject: 'Email Verification',
        text: message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
}

exports.sendResetLink = (mail, link) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'edmundopiyo@gmail.com',
          pass: 'ehmcevmbqwryapyh'
        }
      });
       const message = `Here is your Paylend password reset link: ${link}`
      var mailOptions = {
        from: 'edmundopiyo@gmail.com',
        to: mail,
        subject: 'Reset Password Link',
        text: message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
}