const otpGen  = require("otp-generator");
const otpTool = require("otp-without-db"); 
const key     = "secretKey"; // Use unique key and keep it secret

let phone = "0701376319";  
let email = "edmundopiyo@gmail.com"; 
//let otp   = otpGen.generate(6, {digits:true});    
// Function to generate OTP
function generateOTP() {
          
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
console.log(generateOTP());
//let hash = otpTool.createNewOTP(email,otp,key,5,algorithm="sha256");
//console.log(hash)