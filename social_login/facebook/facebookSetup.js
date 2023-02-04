const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy


passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALL_BACK_URL,
    profileFields: ['id', 'displayName', 'photos', 'email','name','gender','hometown','birthday'],
    state: true,
    enableProof: true

},function(token,refreshToken,profile,done){
    console.log(profile)
    console.log(refreshToken)
    console.log(token)
    return done(null,profile)
}))

passport.serializeUser((user , done) => {
    done(null , user);  
    })
passport.deserializeUser(function(user, done) {
    done(null, user);
    });