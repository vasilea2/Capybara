// Discord bot - current functionality:
// 1. w2g -> create w2g link

require("dotenv").config();
const fetch = require('node-fetch');
const capybaras = require('./CapybaraItems').CapybaraFiles

const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//Listen to the event that signals the bot is ready to start working
client.on("ready", () => {
  if (process.env.DISCORD_TOKEN) console.log("We have discord token")
  if (process.env.W2G_API_KEY) console.log("We have w2g key")
});

//Listen to new messages on the server
client.on("messageCreate", async (message) => {

  // Generate a w2g link when typed w2g
  if (message.content.toLowerCase() === "w2g") {
    createW2gChannel.then(link => { message.reply(link) })
  }

  if (message.content.toLowerCase() === "capybara" || message.content.toLowerCase() === "cpbr") {
    let luckyNumber = between(0, capybaras.size)
    let myCapybara = capybaras.get(luckyNumber)
    message.reply("Azi esti o " + myCapybara.name.split(".")[0])
    message.reply({
      files: [{
        attachment: myCapybara.url,
        name: myCapybara.name
      }]});
  }

  if (message.content === "Cine e smecher?") {
    if (message.member.user.username === "Pojo") message.reply("Cine intreaba e smecher")
    else message.reply(`In nici un caz ${message.member.user.username}`)
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

function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}