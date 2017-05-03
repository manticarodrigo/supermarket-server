const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = new FacebookStrategy({
    clientID: "1046483005413431",
    clientSecret: "03f967b63bc80dfce4117b462595121b",
    callbackURL: "/auth/facebook/callback"
});