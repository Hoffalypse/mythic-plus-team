const http = require("https");

const options = {
  "method": "GET",
  "hostname": "us.api.blizzard.com",
  "port": null,
  "path": "/profile/wow/character/area-52/nakte/character-media?namespace=profile-us&locale=en_us&access_token=USy6qg1fk2j7RDpn3WrCfJ5XxGGwy0oDtn",
  "headers": {
    "Content-Length": "0"
  }
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();