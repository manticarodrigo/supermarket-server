const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const authenticationMiddleware = require('./middleware');

const user = {
  username: 'test-user',
  password: 'test-password',
  id: 1
}

function findUser (username, callback) {
  if (username === user.username) {
    return callback(null, user);
  }
  return callback(null);
}

passport.serializeUser(function (user, cb) {
  cb(null, user.username)
});

passport.deserializeUser(function (username, cb) {
  findUser(username, cb);
});

function initPassport () {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      findUser(username, function (err, user) {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false)
        }
        if (password !== user.password  ) {
          return done(null, false)
        }
        return done(null, user)
      })
    }
  ));

  passport.use(new FacebookStrategy({
    clientID: "1046483005413431",
    clientSecret: "03f967b63bc80dfce4117b462595121b",
    callbackURL: "http://localhost:8000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    findUser(profile.displayName, function (err, user) {
      if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false)
        }
        if (password !== user.password  ) {
          return done(null, false)
        }
        return done(null, user)
    });
  }
  ));

  passport.authenticationMiddleware = authenticationMiddleware;
}

module.exports = initPassport;