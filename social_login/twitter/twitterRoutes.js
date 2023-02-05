const express = require('express');
const { rmSync } = require('fs');
const passport = require('passport');
const { twitterLoginSuccess } = require('./twitterController');
const router = express.Router();


require('./twitterSetup')


router.get('/',passport.authenticate('twitter'))

router.get('/callback',
passport.authenticate( 'twitter', { assignProperty: 'federatedUser', failureRedirect: '/callback/failure' }))

router.get('/callback/success' , (req,res)=>{
    res.send('twiiter login was a success')
});

router.get('/callback/failure' , (req , res) => {
    res.send("Error2");
    })

router.post('/logout',(req,res)=>{
    req.logout();
    res.redirect('/')
})

module.exports = router