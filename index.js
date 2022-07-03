// Discord bot - current functionality:
// 1. w2g -> create w2g link

require("dotenv").config();
const fetch = require('node-fetch');

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//Listen to the event that signals the bot is ready to start working
client.on("ready", () => {
  console.log(`logged in as ${client.user.tag}`);
});

//Listen to new messages on the server
client.on("message", async (message) => {
  console.log(message.content)

  if (message.content.toLowerCase() === "w2g") {
    createW2gChannel.then(link => { message.reply(link) })
  }

  if (message.content.toLowerCase() === "lume") {
    message.reply("test")
  }

  if (message.content === "Cine e smecher?") {
    message.reply("Pojo")
  }
});

//Login to the server using bot token
client.login(process.env.DISCORD_TOKEN);

const createW2gChannel = new Promise((resolve) => {
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