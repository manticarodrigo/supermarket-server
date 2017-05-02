
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const config = require('../config');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

require('./authentication').init(app)

app.use(session({  
  store: new RedisStore({
    url: config.redisStore.url
  }),
  secret: config.redisStore.secret,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize())  
app.use(passport.session())
 
app.use('/', require('../routes'));
 
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// for local testing
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
 
module.exports = app;