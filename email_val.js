const validate = require("./controllers/joi_validation");
const validation = validate.validateSignUp("edmundopiyogmail.com","password");

if(validation){
    console.log(validate.validateSignIn("edmundopiyo@gmail.com","password"));
    console.log(validate.validateForgot("edmundopiyo@gmail.com"));
    console.log(validate.validateReset("password1","password1"));
    console.log(validate.validateOtp("2203"));
}
else{
   // console.log(validation);
}

