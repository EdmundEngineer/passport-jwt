const mongoose = require("mongoose");

const Otp = require("../models/otp");

exports.Otp_save = (otp_generated,user_receiving) => {
    const otp = new Otp({
        _id: mongoose.Types.ObjectId(),
        otp: otp_generated,
        user_id: user_receiving
      });
    otp.save()
    .then(result => {
     /* res.status(200).json({
          "message":"success"
      });*/
      console.log("Successfully added OTP");
    })
    .catch(err => {
      console.log("Adding OTP unsuccessful!!");
    /*  res.status(500).json({
        error: err
      });*/
    });
};
exports.otp_remove = (req, res) =>{
  Otp.find({ user_id:req.body.email })
  .exec()
  .then(otp => {
    if (otp.length < 1) {
      return res.status(409).json({
        message: "OTP does not exists",
        otp_result:otp
      });
    } else {
      return res.status(200).json({
      message:"OTP exists"
      });
    }
  })
  .catch(
    err => {
      console.log(err);
      res.status(500).json({
        error: err
      }
  );
}
  );
}