const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

passport.serializeUser((user , done) => {
    done(null , user);
    })
passport.deserializeUser(function(user, done) {
    done(null, user);
    });
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALL_BACK_URL,
    profileFields:['id','displayName','name','gender','picture.type(large)','email'],
},function(token,refreshToken,profile,done){
    console.log(profile)
    return done(null,profile)
}))

