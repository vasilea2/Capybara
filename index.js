// Discord bot - current functionality:
// 1. w2g -> create w2g link

require("dotenv").config();
const fetch = require('node-fetch');
const axios = require('axios')

const { Client, Intents } = require('discord.js');

let capybaraFiles = new Map()
capybaraFiles.set(0, {name: 'Capybara-agreiva.png', url: "https://i.imgur.com/YqHyFg7.png"})
capybaraFiles.set(1, {name: 'Capybara-cantareta.png', url: "https://i.imgur.com/c8nFd0l.png"})
capybaraFiles.set(2, {name: 'Capybara-la-strand.png', url: "https://i.imgur.com/AEQeeH8.png"})
capybaraFiles.set(3, {name: 'Capybara-erbivora.png', url: "https://i.imgur.com/gllAQmP.png"})
capybaraFiles.set(4, {name: 'Capybara-cu-palarie.png', url: "https://i.imgur.com/SnpQYE7.png"})
capybaraFiles.set(5, {name: 'Capybara-fericita.png', url: "https://i.imgur.com/DfIYWjP.png"})
capybaraFiles.set(6, {name: 'Capybara-furioasa.png', url: "https://i.imgur.com/121OJFY.png"})
capybaraFiles.set(7, {name: 'Capybara-girafa.png', url: "https://i.imgur.com/kLqb4Q6.png"})
capybaraFiles.set(8, {name: 'Capybara-inotatoare.png', url: "https://i.imgur.com/PwevNxu.png"})
capybaraFiles.set(9, {name: 'Capybara-somnoroasa.png', url: "https://i.imgur.com/PtPGxt0.png"})
capybaraFiles.set(10, {name: 'Capybara-de-cartier.png', url: "https://i.imgur.com/YNbnZPd.png"})
capybaraFiles.set(11, {name: 'Capybara-st-patrick.png', url: "https://i.imgur.com/6VpBvKC.png"})
capybaraFiles.set(12, {name: 'Capybara-elena-luminita.png', url: "https://i.imgur.com/ELVWZ61.png"})
capybaraFiles.set(13, {name: 'Capybara-salam.png', url: "https://i.imgur.com/ORnbN6U.png"})
capybaraFiles.set(14, {name: 'Capybara-micuta.png', url: "https://i.imgur.com/QCKLADt.png"})
capybaraFiles.set(15, {name: 'Capybara-hipster.png', url: "https://i.imgur.com/rXhhytp.png"})
capybaraFiles.set(16, {name: 'Capybara-machidon.png', url: "https://i.imgur.com/ITq0oeO.png"})

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
    let luckyNumber = between(0, capybaraFiles.size)
    let myCapybara = capybaraFiles.get(luckyNumber)
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