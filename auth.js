const passport = require('passport'); 

// See alos: https://www.passportjs.org/packages/
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, cb) {
    // after you have logged in
    // you may want to fetch the user from the DB. 

    // the tokens in this context would allow users to access other google reources. 

    /* User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });*/

    // if there is no DB you could just return the profile. 
    return done(null,profile);
  }
));


// serialize
passport.serializeUser(function(user,done){
    done(null, user);
})


passport.deserializeUser(function(user,done){
    done(null, user);
})