const {TwitterAPI} = require('twitter-api-v2')

// const twitterClient = new TwitterAPI(process.env.BEARER_TOKEN);
const client = new TwitterApi({ clientId: process.env.TWITTER_CLIENT_ID, clientSecret: process.env.TWITTER_CLIENT_SECRET });
// const readOnlyClient = twitterClient.readOnly;

// Don't forget to specify 'offline.access' in scope list if you want to refresh your token later
const { url, codeVerifier, state } = client.generateOAuth2AuthLink(process.env.TWITTER_CALL_BACK_URL, { scope: ['tweet.read', 'users.read', 'offline.access'] });

// Redirect your user to {url}, store {state} and {codeVerifier} into a DB/Redis/memory after user redirection

app.get('/callback', (req, res) => {
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