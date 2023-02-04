const express = require('express')
const router = express.Router()
const passport = require('passport');
const { linkedinLoginSuccess } = require('./linkedinController');


require('./linkedinSetup');


router.get('/',passport.authenticate('linkedin',{ state: "SOME STATE" }))

router.get('/callback',passport.authenticate( 'linkedin', {
    successRedirect: '/linkedIn/callback/success',
    failureRedirect: '/linkedIn/callback/failure'
    }))

router.get('/callback/success' , linkedinLoginSuccess);

router.get('/callback/failure' , (req , res) => {
    res.send("Error");
    })

router.post('/logout',(req,res)=>{
    req.logout();
    res.redirect('/')
})

module.exports = router