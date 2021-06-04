const config = require("./data/config.json"); 
const Discord = require("discord.js");
const client = new Discord.Client();
require("./data/functions.js")(client);

module.exports = {
client: client
};

client.login(config.BOT.token);