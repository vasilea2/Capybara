// W2G Controller

const fetch = require('node-fetch')

module.exports.GetLink = new Promise((resolve) => {
    fetch("https://w2g.tv/rooms/create.json", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "w2g_api_key": process.env.W2G_API_KEY,
            "share": "https://www.youtube.com/watch?v=m1k3Cpke4yU",
            "bg_color": "#000000",
            "bg_opacity": "50"
        })
    })
    .then(response => response.json())
    .then(function (data) {
        resolve("https://w2g.tv/rooms/" + data.streamkey)
    });
  })
  