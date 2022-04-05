// Get environment variables from .env
require('dotenv').config()

// LIBRARIES
// Express framework:  https://www.npmjs.com/package/express
const express = require('express');             
// Session middleware: https://www.npmjs.com/package/express-session
const ExpressSession = require('express-session');     
// Persist sessions in MongoDB:  https://www.npmjs.com/package/connect-mongo
const MongoStore = require('connect-mongo');    
// Authentication middleware: https://www.npmjs.com/package/passport
const passport = require('passport');  
// Authenticate with Google using OAuth2.0 https://www.npmjs.com/package/passport-google-oauth20       
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configure Passport to use Google for login
// Create your Google Client ID and Secret here: https://console.developers.google.com
passport.use(new GoogleStrategy({
  clientID:     process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:  process.env.GOOGLE_CALLBACK_URL ,
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

// Passport uses serializeUser function to persist user data in the session.
passport.serializeUser(function(user, done) {
  done(null, user);
});

//  Function deserializeUser is used to retrieve user data from session.
passport.deserializeUser(function(user, done) {
  done(null, user);
});




const app = express();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

// Enable Express Session Middleware. 
// Include configuration to store sessions in MongoDB
// See also: https://www.npmjs.com/package/connect-mongo#express-or-connect-integration
app.use(ExpressSession({ 
    secret: 'a random string about cats', 
    resave: false, 
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        dbName: 'UserSessions'
    })
}));

// Initialize passport 
// In  Express, the order of the middlewares matters. 
// http://expressjs.com/en/guide/using-middleware.html
app.use(passport.initialize());
app.use(passport.session());

app.use('/', express.static('public'))

app.use('/dashboard', express.static('protected'))

// app.get('/', (req, res) => {
//   res.send('');
// });


// This is where we end up if you click "Authenticate with Google."
app.get('/auth/google',
  passport.authenticate('google', { 
    scope: [ 'email', 'profile' ] 
  })
);

app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/protected',
    failureRedirect: '/'
  })
);

app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

app.listen(5000, () => console.log('listening on port: 5000'));