const express = require('express')
const passport = require('passport')
const router = express.Router()
 
require('./facebookSetup')

router.get('/',passport.authenticate('facebook',{scope:['profile','email']}))
 
router.get('/callback',passport.authenticate( 'facebook', {
successRedirect: '/facebook/callback/success',
failureRedirect: '/facebook/callback/failure'
}))
router.get('/callback/success' , (req , res) => {
    if(!req.user)
    res.redirect('/callback/failure');
    // console.log(req)
    res.send("Welcome " + req.user.email );
    });

router.get('/callback/failure' , (req , res) => {
    res.send("Error");
    })

router.get('/logout',(req,res)=>{
    req.session = null;
    console.log('--------request--------')
    console.log(req.session)
    console.log('--------request--------')
    req.logout();
    console.log('--------request--------')
    console.log(req.session)
    console.log('--------request--------')
    res.redirect('/')
})

module.exports = router