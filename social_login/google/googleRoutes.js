const express = require('express')
const router = express.Router()
const passport = require('passport')
require('./googleSetup')
router.get('/',passport.authenticate('google',{scope:['profile','email']}))

router.get('/callback',
passport.authenticate( 'google', {
successRedirect: '/google/callback/success',
failureRedirect: '/google/callback/failure'
}))

router.get('/callback/success' , (req , res) => {
    if(!req.user)
    res.redirect('/failed');

    res.send("Welcome " + req.user.email);
    });

router.get('/callback/failure' , (req , res) => {
    res.send("Error");
    })

router.get('/logout',(req,res)=>{
    req.session = null;
    console.log('--------request--------')
    console.log(req)
    console.log('--------request--------')
    req.logOut();
    res.redirect('/')
})

module.exports = router