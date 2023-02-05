const express = require('express')
const router = express.Router()
const passport = require('passport')
const { googleLoginSuccess } = require('./googleController')
require('./googleSetup')

router.get('/',passport.authenticate('google',{scope:['profile','email']}))

router.get('/callback',
passport.authenticate( 'google', {
successRedirect: '/google/callback/success',
failureRedirect: '/google/callback/failure'
}))

router.get('/callback/success' , googleLoginSuccess);

router.get('/callback/failure' , (req , res) => {
    res.send("Error");
    })

router.post('/logout',(req,res)=>{
 
    req.logout();
    res.redirect('/')
})

module.exports = router