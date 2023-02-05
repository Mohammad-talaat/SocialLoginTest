require("dotenv").config();
const express = require('express');
const cors = require('cors')
// const cookieSession = require('cookie-session')
const session = require('express-session')
const morgan = require('morgan')

const app = express()
const passport = require('passport')
const googleRoutes = require('./social_login/google/googleRoutes')
const facbookRoutes = require('./social_login/facebook/facebookRoutes')
const linkedInRoutes = require('./social_login/linkedin/linkedinRoutes')
const twitterRoutes = require('./social_login/twitter/twitterRoutes')

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms')
)

app.use(session({
    secret: process.env.SESSION_SECERT,
    resave:true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{
    res.send('hi this is the homepage')
})

app.use('/google',googleRoutes)
app.use('/facebook',facbookRoutes)
app.use('/linkedIn',linkedInRoutes)
app.use('/twitter',twitterRoutes)
app.get('/deleteUserData',(req,res)=>{
    res.send('user Data is deleted')
})
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port: ${process.env.PORT}`)
})

