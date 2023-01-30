require("dotenv").config();
const express = require('express');
const cors = require('cors')
const cookieSession = require('cookie-session')

const app = express()
const passport = require('passport')
const googleRoutes = require('./social_login/google/googleRoutes')
const facbookRoutes = require('./social_login/facebook/facebookRoutes')
app.use(cors())
app.use(express.json())
app.use(passport.initialize())
app.use(cookieSession({
    name:'loginSession',
    keys:['key1','key2']
}))
app.use(passport.session())

app.get('/',(req,res)=>{
    res.send('hello this is the homepage')
})

app.use('/google',googleRoutes)
app.use('/facebook',facbookRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port: ${process.env.PORT}`)
})

