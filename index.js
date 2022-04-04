require('dotenv').config()

const PORT = process.env.PORT || 5000	

const express = require('express')
const session = require('express-session')
const passport = require('passport')
require('./auth');



// created with help from Kris Foster 
// https://www.youtube.com/watch?v=Q0a0594tOrc 

const app = express();

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true
}))  



// this is a custom middleware function
// you can add it to any route to protect it.
function isLoggedIn(req,res,next){
    req.user? next() : res.sendStatus(401)
}

app.get('/', (req,res)=>{
    // a link to login with google. 
    res.send('<a href="/auth/google">Login with Google</a>');
})


app.get('/auth/google', (req,res)=>{ 
    // todo i think 'google' here refers to a passport "strategy"? check this.
    // todo why/how are these scopes available?
    passport.authenticate('google', {
        scope: ['email', 'profile']
    })
})


app.get('/google/callback', (req,res)=>{ 
    passport.authenticate('google',{
        successRedirect: '/protected',
        failureRedirect: '/auth/failure'
    })
})

app.get('/auth/failure', (req,res)=>{
    res.send('something went wrong');
})

// this route can only be visited if you are loggedin.
app.get('/protected', isLoggedIn, (req,res) =>{
    res.send('protected');
})



app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`);
})