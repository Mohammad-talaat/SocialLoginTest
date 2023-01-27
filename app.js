require("dotenv").config();
const express = require('express');
const cors = require('cors')
const app = express()
const passport = require('passport')
const cookieSession = require('cookie-session')
require('./social_login/passportSetup')
app.use(cors())
app.use(passport.initialize())
app.use(cookieSession({
    name:'loginSession',
    keys:['key1','key2']
}))
app.use(passport.session())

app.get('/',(req,res)=>{
    res.send('hello this is the homepage')
})
// app.get('/success',(req,res)=>{
//     res.send('successfull google authenticaion')
// })
// app.get('/failed',(req,res)=>{
//     res.send('failed google authentication')
// })
app.get('/google',passport.authenticate('google',{scope:['profile','email']}))

// Auth Callback
app.get('/google/callback',
passport.authenticate( 'google', {
successRedirect: '/google/callback/success',
failureRedirect: '/google/callback/failure'
}));
 
// Success
app.get('/google/callback/success' , (req , res) => {
if(!req.user)
res.redirect('/failed');
res.send("Welcome " + req.user.email);
});
 
// failure
app.get('/google/callback/failure' , (req , res) => {
res.send("Error");
})
 

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port: ${process.env.PORT}`)
})