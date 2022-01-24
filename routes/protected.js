const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
app.get('/',passport.authenticate("jwt", {session: false}),(req, res) =>{
    console.log("Protected route");
});

module.exports = app;