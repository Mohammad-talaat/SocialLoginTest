require("dotenv").config();
const express = require('express');
const cors = require('cors')
// const cookieSession = require('cookie-session')
const session = require('express-session')


const app = express()
const passport = require('passport')
const googleRoutes = require('./social_login/google/googleRoutes')
const facbookRoutes = require('./social_login/facebook/facebookRoutes')
const linkedInRouters = require('./social_login/linkedin/linkedinRoutes')

app.use(cors())
app.use(express.json())

app.use(session({
    secret: process.env.SESSION_SECERT,
    resave:true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{
    res.send('hello this is the homepage')
})

app.use('/google',googleRoutes)
app.use('/facebook',facbookRoutes)
app.use('/linkedIn',linkedInRouters)
app.get('/deleteUserData',(req,res)=>{
    res.send('user Data is deleted')
})
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port: ${process.env.PORT}`)
})

