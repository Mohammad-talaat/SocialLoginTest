const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALL_BACK_URL
  },
  function(token, tokenSecret, profile, done) {
    console.log(token,tokenSecret, profile)
    return done(null,profile);
  }
));

passport.serializeUser((user , done) => {
    done(null , user);
    })
passport.deserializeUser(function(user, done) {
    done(null, user);
    });