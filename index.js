// Discord bot - current functionality:
// 1. w2g -> create w2g link

require("dotenv").config();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const w2g = require('./W2g')
const capybara = require('./Capybara')

//Listen to the event that signals the bot is ready to start working
client.on("ready", () => {
  if (process.env.DISCORD_TOKEN) console.log("We have discord token")
  if (process.env.W2G_API_KEY) console.log("We have w2g key")
});

//Listen to new messages on the server
client.on("messageCreate", async (message) => {

  // Generate a w2g link when typed w2g
  if (message.content.toLowerCase() === "w2g") {
    w2g.GetLink.then(link => message.reply(link))
  }

  // Generate capybara
  if (message.content.toLowerCase().includes("capybara") || message.content.toLowerCase().includes("cpbr")) {
    capybara.HandleCapybara(message).then(result => {
      if (result[0]) message.reply(result[0])
      if (result[1]) message.reply(result[1])
    })
  }

  // Supplimentary additions
  if (message.content === "Cine e smecher?") {
    if (message.member.user.username === "Pojo") message.reply("Cine intreaba e smecher")
    else message.reply(`In nici un caz ${message.member.user.username}`)
  }
});

//Login to the server using bot token
client.login(process.env.DISCORD_TOKEN);