const Joi = require('joi');
exports.validateSignUp = (mail, password_sent) => {
    const schema = Joi.object({      
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'africa'] } }).required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    }).with('email', 'password');
 
 
        schema.validateAsync({ email: mail, password: password_sent  })
                             .then((result)=>{
                                console.log(`Then Message:${result}`);
                               // return result;
                             })
                             .catch(
                                 (err)=>{
                                    console.log(err.details[0].message);    
                                   // return err.details[0].message;
                                 }
                             );
      //  console.log(`Message:${value}`);
   
    
   
}
exports.validateSignIn = (mail, password_sent) => {
    const schema = Joi.object({      
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    }).with('email', 'password');
    
    const value =  schema.validateAsync({ email: mail, password: password_sent  })
    .then((result)=>{
      console.log(`Then Message:${result.email}`);
      
   })
   .catch(
       (err)=>{
          console.log(err.details[0].message);    
          return result
       }
   );
}
exports.validateForgot = (mail) => {
    const schema = Joi.object({      
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
    });
    
    try {
        const value =  schema.validateAsync({ email: mail });
        return value;
    }
    catch (err) { 
        return err;
    }
}
exports.validateReset = (password1, password2) => {
    const schema = Joi.object({      
        password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

        repeat_password: Joi.ref('password')
    });
    
    try {
        const value =  schema.validateAsync({ password: password1, repeat_password:password2  });
        return value;
    }
    catch (err) { 
        return err;
    }
}
exports.validateOtp = (otp_sent) => {
    const schema = Joi.object({  
          
        otp:  Joi.string()
        .length(4)
        .required()
    });
    
    try {
        const value =  schema.validateAsync({ otp: otp_sent });
        return value;
    }
    catch (err) { 
        return err;
    }
}

/*exports.validateLogin = (mail, password_sent) => {
    const schema = Joi.object({      
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    }).with('email', 'password');
    
    try {
        const value =  schema.validateAsync({ email: mail, password: password_sent  });
        return value;
    }
    catch (err) { 
        return err;
    }
}*/
exports.validateLogin = (mail, link) => {}