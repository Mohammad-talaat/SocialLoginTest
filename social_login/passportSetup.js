const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy

passport.serializeUser((user , done) => {
    done(null , user);
    })
passport.deserializeUser(function(user, done) {
    done(null, user);
    });

    passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_CALL_BACK_URL,
    passReqToCallback:true},
    function(request,accessToken,refreshToken,profile,done){
        console.log(request)
        console.log('-----------------------')
        console.log(accessToken)
        console.log('-----------------------')
        console.log(refreshToken)
        console.log('-----------------------')
        console.log(profile)
        console.log('-----------------------')
        console.log(done)
        console.log('-----------------------')
        return done(null,profile)
    }))
