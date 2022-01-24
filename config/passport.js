
const passport = require("passport");
const User = require("../models/user");
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
    const keygen = require("keygenerator");

const key = "dZ9rcjxB2X45MXobcgPNEXgmPjHpfsVi";
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;
//opts.issuer = 'accounts.examplesoft.com';
//opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));