const config = require("../../data/config.json");
const {client} = require("../../bot.js");

let prefix = config.BOT.prefix;

client.on("message", async (message) => {
if(message.author.bot || message.channel.type === "dm") return;
let args = message.content.slice(prefix.length).trim().split(/ +/g);
let cmd = args.shift().toLowerCase();
if(!message.content.startsWith(prefix)) return;
let commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
if(commandfile) commandfile.run(client, message, args);
});