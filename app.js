const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require('http');
const port = process.env.PORT || 3000;
const passport = require("passport");
/*var csrf = require('csurf');
const csrfProtection = csrf({
  cookie: true
});*/

require("./config/passport");

mongoose.connect('mongodb://127.0.0.1:27017/paylend_2_0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
mongoose.connection.once('open', ()=>{ console.log("Mongodb connected successfully");} );
mongoose.connection.on('error', error => console.log(error) );

  mongoose.Promise = global.Promise;

  //app.use(csrf());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
  const sampleRoutes = require("./routes/routes");
  const protectedRoutes = require("./routes/protected");
  app.use("",sampleRoutes);
  //app.use("/protected",protectedRoutes);
  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });
  const server = http.createServer(app);

server.listen(port, () => {
    console.log('Server started.');
});
  
 