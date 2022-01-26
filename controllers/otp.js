const mongoose = require("mongoose");

const Otp = require("../models/otp");

exports.Otp_save = (otp_generated,user_receiving) => {
    const otp = new Otp({
        _id: mongoose.Types.ObjectId(),
        otp: otp_generated,
        user_id: user_receiving
      });
    otp.save()
    .then(otp => {
     /* res.status(200).json({
          "message":"success"
      });*/
      console.log("Successfully added OTP");
    })
    .catch(err => {
      console.log("User with this OTP already exists");
    /*  res.status(500).json({
        error: err
      });*/
    });
};