import Twitter from "twitter-lite";
import cheerio from "cheerio";
// import nodeFetch from "node-fetch";
import superagent from 'superagent'

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export default (req, res) =>
  new Promise(async (resolve) => {
    const { body } = req;
    const b = JSON.parse(req.body);
    const { access_token, access_token_secret, post_id, post_url } = b;

    if (!req.body || !access_token || !access_token_secret || !post_id) {
      resolve(res.status(400).end());
    }

    const client = new Twitter({
      consumer_key: process.env.TWITTER_CLIENT_ID,
      consumer_secret: process.env.TWITTER_CLIENT_SECRET,
      access_token_key: access_token,
      access_token_secret,
    });

    const response = await superagent.get(
      `https://twitter.com/i/activity/favorited_popup?id=${post_id}`,
    )
    const text = response.body;

    const $ = cheerio.load(text["htmlUsers"]);
    let screenNames = [];

    $("div[data-user-id]").each(function (i, el) {
      const name = $(el).attr("data-screen-name");

      if (name) {
        screenNames.push(name);
      }
    });

    const tokens = post_url.split("/");

    const originalPoster = tokens[tokens.indexOf("status") - 1];

    await client
      .post("blocks/create", {
        screen_name: originalPoster,
      })
      .catch((err) => console.error(err));

    await Promise.all(
      screenNames
        .filter(onlyUnique)
        .map((name) => client.post("blocks/create", { screen_name: name }))
    ).catch((err) => console.error(err));

    resolve(res.status(200).end());
  });
