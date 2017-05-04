const login = require('./login');
const signup = require('./signup');
const facebook = require('./facebook');
const usersDB = require('../users/users.db');

const authenticationMiddleware = require('./middleware');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
      console.log('serializing user: ');console.log(user);
      done(null, user._id);
    });

    passport.deserializeUser(function(_id, done) {
      usersDB.findUser(_id, function(err, user) {
        console.log('deserializing user:',user);
        done(err, user);
      });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);

    // Setting up Passport Strategies for Facebook and Twitter
    facebook(passport);
    // twitter(passport);

    passport.authenticationMiddleware = authenticationMiddleware;
}