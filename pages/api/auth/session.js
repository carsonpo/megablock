import Twitter from "twitter-lite";

export default (req, res) =>
  new Promise((resolve) => {
    const {
      body: { access_token, access_token_secret },
    } = req;

    const client = new Twitter({
      consumer_key: process.env.TWITTER_CLIENT_ID,
      consumer_secret: process.env.TWITTER_CLIENT_SECRET,
      access_token_key: access_token,
      access_token_secret,
    });
  });
