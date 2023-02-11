const express = require('express');
const passport = require('passport');
const { twitterLoginSuccess } = require('./twitterController');
const router = express.Router();
 

require('./twitterSetup')


router.get('/',passport.authenticate('twitter',{
    scope: ['tweet.read', 'users.read', 'offline.access']
}))

router.get('/oauth/callback',
passport.authenticate( 'twitter', {
successRedirect: '/twitter/callback/success',
failureRedirect: '/twitter/callback/failure'
}))

router.get('/callback/success' , twitterLoginSuccess);

router.get('/callback/failure' , (req , res) => {
    res.send("Error2");
    })

router.post('/logout',(req,res)=>{
    req.logout();
    res.redirect('/')
})

module.exports = router