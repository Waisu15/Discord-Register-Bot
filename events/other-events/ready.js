const config = require("../../data/config.json"); 
const {client} = require("../../bot.js");
const moment = require("moment");
const chalk = require("chalk");

let prefix = config.BOT.prefix;
let game = config.SETTİNGS.status;
let kanal = config.SETTİNGS.botseskanal;

client.on("ready", async () => {   
client.user.setPresence({ activity: { name: "Starting / Developer Waisu" }, status: "dnd" });
setInterval(function() {
let games = game[Math.floor(Math.random() * game.length)];
client.user.setPresence({ activity: { name: games }, status: "dnd" });
let ses = client.channels.cache.get(kanal);
if(ses) ses.join();
}, 10000);
console.clear();
console.log(chalk `{greenBright [${moment().format('YYYY-MM-DD HH:mm:ss')}]} Prefix {green ${prefix}}`);
console.log(chalk `{greenBright [${moment().format('YYYY-MM-DD HH:mm:ss')}]} {red Waisu} | {blueBright ${client.user.username}} İsmi İle Giriş Yapıldı.`);  
});

client.on('voiceStateUpdate', async (oldState, newState) => {
if(newState.member.user.bot && newState.channelID && newState.member.user.id == client.user.id && !newState.selfDeaf) newState.setSelfDeaf(true);
});