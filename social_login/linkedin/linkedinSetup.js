const passport = require('passport')
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy



passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: process.env.LINKEDIN_CALL_BACK_URL,
    scope: ['r_emailaddress','r_liteprofile']
},function(accessToken,refreshToken,profile,done){
    console.log('-------------accessToken------')
    console.log(accessToken)
    console.log('-------------accessToken------')
    console.log('-------------RefreshToken------')
    console.log(refreshToken)
    console.log('-------------RefreshToken------')
    console.log('-------------profile-----------')
    console.log(profile)
    console.log('-------------profile-----------')
    return done(null,profile)
}))
