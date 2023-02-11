const passport = require('passport')
const TwitterStrategy = require('@superfaceai/passport-twitter-oauth2').Strategy

passport.use(new TwitterStrategy({
  clientID: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
  clientType: 'confidential',
  callbackURL: process.env.TWITTER_CALL_BACK_URL,
 
},
  function(accessToken, refreshToken,email, profile, done) {
    console.log('-----------------fadf---------')
    console.log(accessToken,refreshToken, profile,email)
    console.log('-----------------fadf---------')
    return done(null,profile,email);
  }
));

passport.serializeUser((user , done) => {
    done(null , user);
    })
passport.deserializeUser(function(user, done) {
    done(null, user);
    });