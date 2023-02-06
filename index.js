require("dotenv").config();
const express = require('express');
const cors = require('cors')
// const cookieSession = require('cookie-session')
const session = require('express-session')
const morgan = require('morgan')

const app = express()
const passport = require('passport')
const twitterRoutes = require('./social_login/twitterLogin/twitterRoutes')

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms')
)

app.use(session({ 
    secret: process.env.SESSION_SECERT,
    resave:true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{
    res.send('hi this is the homepage')
})

/* ------twitter test----------- */
app.get('/twitter/oauth/callback', (req, res) => { 
    // Extract state and code from query string
    const { state, code } = req.query;
    // Get the saved codeVerifier from session
    const { codeVerifier, state: sessionState } = req.session;
  
    if (!codeVerifier || !state || !sessionState || !code) {
      return res.status(400).send('You denied the app or your session expired!');
    }
    if (state !== sessionState) {
      return res.status(400).send('Stored tokens didnt match!');
    }
  
    // Obtain access token
    const client = new TwitterApi({ clientId: process.env.TWITTER_CLIENT_ID, clientSecret: process.env.TWITTER_CLIENT_SECRET });
  
    client.loginWithOAuth2({ code, codeVerifier, redirectUri: process.env.TWITTER_CALL_BACK_URL })
      .then(async ({ client: loggedClient, accessToken, refreshToken, expiresIn }) => {
        // {loggedClient} is an authenticated client in behalf of some user
        // Store {accessToken} somewhere, it will be valid until {expiresIn} is hit.
        // If you want to refresh your token later, store {refreshToken} (it is present if 'offline.access' has been given as scope)
  
        // Example request
        const { data: userObject } = await loggedClient.v2.me();
      })
      .catch(() => res.status(403).send('Invalid verifier or access tokens!'));
  });
/* ------twitter test----------- */
// app.use('/twitter',twitterRoutes)
app.get('/deleteUserData',(req,res)=>{
    res.send('user Data is deleted')
})
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port: ${process.env.PORT}`)
})

