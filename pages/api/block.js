import Twitter from "twitter-lite";
import cheerio from "cheerio";
import nodeFetch from "node-fetch";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export default (req, res) =>
  new Promise(async (resolve) => {
    const { body } = req;
    const b = JSON.parse(req.body);
    const { access_token, access_token_secret, list_id, list_url } = b;

    if (!req.body || !access_token || !access_token_secret || !list_id) {
      resolve(res.status(400).end());
    }


    const client = new Twitter({
      consumer_key: process.env.TWITTER_CLIENT_ID,
      consumer_secret: process.env.TWITTER_CLIENT_SECRET,
      access_token_key: access_token,
      access_token_secret,
    });

    console.log(list_id)

    const response = await client.get("lists/subscribers", {
      list_id: list_id,
      count:5000
    }).catch((err) => console.error(err));

    console.log(response)
    let screenNames = [];

    const {users} = response;

    users.forEach(function (u) {
      const name = u.screen_name;

      if (name) {
        screenNames.push(name);
      }
    });

    console.log(screenNames);

    const owner_response = await client.get("lists/show", {
      list_id: list_id
    }).catch((err) => console.error(err));

    console.log(owner_response);

    const {user} = owner_response;
    const originalPoster = user.screen_name;


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
