const validate = require("./controllers/joi_validation");
console.log(validate.validateSignUp("edmundopiyo@gmail.com","password"));
console.log(validate.validateSignIn("edmundopiyo@gmail.com","password"));
console.log(validate.validateForgot("edmundopiyo@gmail.com"));
console.log(validate.validateReset("password1","password1"));
console.log(validate. validateOtp("2203"));