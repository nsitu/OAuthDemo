// Get environment variables from .env
require('dotenv').config()

// get a port number from the environment, or else default to 5000
const PORT = process.env.PORT || 5000
// get a base URL from the environment, or else assume localhost
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

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

// Configure the Google OAuth Strategy for Passport
// Create your Google Client ID and Secret here: https://console.developers.google.com
const GoogleOAuth = new GoogleStrategy({
        clientID:     process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:  BASE_URL+'/auth/google/callback' 
    },  
    (accessToken, refreshToken, profile, done) => {
        // In this case, just return the user profile directly. 
        // Alternately you could fetch additional user data from a database.
        // see also: https://www.passportjs.org/packages/passport-google-oauth20/
        return done(null, profile);
    }
)

// Implement The GoogleOAuth strategy configured above. 
passport.use( GoogleOAuth ) 

// Serializing Data
// Passport converts user data (JSON) into plain text for session storage.
// On subsequent requests, the text is converted back into JSON data.
// This process is known as "serialization". It is customizable. 
// For a discussion on this, see also: https://stackoverflow.com/q/27637609/17929842

// Passport.serializeUser persists user data in the session
passport.serializeUser( (user, done) => { done(null, user) })
//  Passport.deserializeUser retrieves user data from session
passport.deserializeUser( (user, done) => { done(null, user) })

// initialize Express
const app = express();

// Public files may be served immediately without authentication. 
app.use('/', express.static('public'))

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

// Initialize passport (authentication middleware)
app.use(passport.initialize());
// Initialize session. See also: https://stackoverflow.com/questions/22052258/
app.use(passport.session());

// Listen for clicks on the "Authenticate with Google" button
// Passport will then fetch permission from Google on behalf of the user.
// We can specify which user information we want (e.g. "scopes")
app.get('/auth/google',
  passport.authenticate('google', {  scope: [ 'email', 'profile' ]  })
);

// Google Callback: After authentication Google forwards us to this URL
app.get( '/auth/google/callback',
   // if successful, redirect to the dashboard. 
   // if not, redirect back to the homepage.
    passport.authenticate( 'google', { 
      successRedirect: '/dashboard',
      failureRedirect: '/'
    })
)

// Middleware function to check if user is logged in or not
function userIsAuthenticated (req, res, next) {
    // if a user exists, proceed to the secure area.
    if (req.user) next() 
    // if no user exists, redirect to the public homepage.
    else res.redirect('/')
}

// Tell express to require Authentication.
// All the endpoints that follow will not work unless logged in. 
// Note: In  Express, the order of the middlewares matters. 
// http://expressjs.com/en/guide/using-middleware.html
app.use(userIsAuthenticated);

// If the front end needs user data, 
// it can be fetched via this endpoint. 
// by this point Passport has already deserialized user data
// so we can send it to the frontend as JSON
app.get('/user', (req,res) => {
    // console.log(req.user)
    res.send(req.user._json)
})

// Since  Authentication is required at this point, 
// it is safe to publish the protected "dashboard" folder
app.use('/dashboard',  express.static('dashboard'))

// Listen for logout requests.
// When the user logs out, redirect them to the homepage. 
app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});


// get a PORT number from the environment or else use 5000 as default
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));