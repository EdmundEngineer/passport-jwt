var nodemailer = require('nodemailer');
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