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
        console.log('---------request--------------')
        console.log(request.session)
        console.log('---------request--------------')
        console.log('----------accessToken-------------')
        console.log(accessToken)
        console.log('----------accessToken-------------')
        console.log('-----------RefreshToken------------')
        console.log(refreshToken)
        console.log('-----------RefreshToken------------')
        console.log('---------Profile--------------')
        console.log(profile)
        console.log('---------Profile--------------')
        console.log('----------------Done-------')
        console.log(done)
        console.log('----------------Done-------')
        return done(null,profile)
    }))
