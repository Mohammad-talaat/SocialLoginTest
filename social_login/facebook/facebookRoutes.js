const express = require('express')
const passport = require('passport')
const router = express.Router()

require('./facebookSetup')

router.get('/',passport.authenticate('facebook'))

router.get('/callback',passport.authenticate( 'facebook', {
successRedirect: '/facebook/callback/success',
failureRedirect: '/facebook/callback/failure'
}))
router.get('/callback/success' , (req , res) => {
    if(!req.user)
    res.redirect('/callback/failure');
    // console.log(req)
    res.send("Welcome " + req.user );
    });

router.get('/callback/failure' , (req , res) => {
    res.send("Error");
    })

router.post('/logout',(req,res)=>{
    req.logout();
    res.redirect('/')
})
module.exports = router