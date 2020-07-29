import Twitter from "twitter-lite";

const client = new Twitter({
  consumer_key: process.env.TWITTER_CLIENT_ID,
  consumer_secret: process.env.TWITTER_CLIENT_SECRET,
});

export default (req, res) =>
  new Promise((resolve) => {
    const {
      query: { oauth_token, oauth_verifier },
    } = req;
    client
      .getAccessToken({
        oauth_token,
        oauth_verifier,
      })
      .then((result) => {
        resolve(
          res.redirect(
            `/?access_token=${result.oauth_token}&access_token_secret=${result.oauth_token_secret}&screen_name=${result.screen_name}&user_id=${result.user_id}`
          )
        );
      })
      .catch((err) => {
        console.error(err);
        resolve(res.redirect("/"));
      });
  });
