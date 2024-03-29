var FacebookStrategy = require('passport-facebook').Strategy;
const usersDB = require('../users/users.db');

module.exports = function(passport) {
	passport.use(new FacebookStrategy({
      clientID: "1046483005413431",
	  	clientSecret: "03f967b63bc80dfce4117b462595121b",
	  	callbackURL: "/login/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {

	  console.log('profile', profile);

	  // asynchronous
	  process.nextTick(function() {
		usersDB.findUserByFbId(profile.id, function (err, user) {
			// if there is an error, stop everything and return that
			// ie an error connecting to the database
			if (err)
				return done(err);

			// if the user is found, then log them in
			if (user) {
				return done(null, user); // user found, return that user
			} else {
				// if there is no user found with that facebook id, create them
				var newUser = new User();

				// set all of the facebook information in our user model
				newUser.fb.id    = profile.id; // set the users facebook id	                
				newUser.fb.access_token = accessToken; // we will save the token that facebook provides to the user	                
				newUser.fb.firstName  = profile.name.givenName;
				newUser.fb.lastName = profile.name.familyName; // look at the passport user profile to see how names are returned
				newUser.fb.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

				// save our user to the database
				usersDB.saveUser(newUser, function (err, data) {
					if (err)
						throw err;
					// if successful, return the new user
					return done(null, newUser);
				});
			}
		})
	  });
    }
  ));
};