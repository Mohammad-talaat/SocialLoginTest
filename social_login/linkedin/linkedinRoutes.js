const express = require('express')
const router = express.Router()
const passport = require('passport')


require('./linkedinSetup');


router.get('/',passport.authenticate('linkedin',{ state: "SOME STATE" }))


// router.get('/callback/success' , (req , res) => {
//     if (req.user) {
//         const name = req.user.name.givenName;
//         const family = req.user.name.familyName;
//         const photo = req.user.photos[0].value;
//         const email = req.user.emails[0].value;
//         res.send(
//           `<center style="font-size:140%"> <p>User is Logged In </p>
//           <p>Name: ${name} ${family} </p>
//           <p> Linkedn Email: ${email} </p>
//           <img src="${photo}"/>
//           </center>
//           `
//         )
//       } else {
//         res.send(`<center style="font-size:160%"> <p>This is Home Page </p>
//         <p>User is not Logged In</p>
//         <img style="cursor:pointer;"  onclick="window.location='/auth/linkedIn'" src="http://www.bkpandey.com/wp-content/uploads/2017/09/linkedinlogin.png"/>
//         </center>
//         `);
//         // res.redirect('/callback/failure');
//       }
//     });
router.get('/callback',passport.authenticate( 'linkedin', {
    successRedirect: '/linkedIn/callback/success',
    failureRedirect: '/linkedIn/callback/failure'
    }))
    router.get('/callback/success' , (req , res) => {
        if(!req.user){
            console.log(req)
            res.redirect('/callback/failure');
        }
        // res.send("Welcome " + req.user.name.givenName );
        const name = req.user.name.givenName;
                const family = req.user.name.familyName;
                const photo = req.user.photos[0].value;
                const email = req.user.emails[0].value;
                res.send(
                        `<center style="font-size:140%"> <p>User is Logged In </p>
                        <p>Name: ${name} ${family} </p>
                        <p> Linkedn Email: ${email} </p>
                        <img src="${photo}"/>
                        </center>
                        `)
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