const Discord = require("discord.js");
const fs = require("fs");

module.exports = client => {

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/register-commands/", (err, files) => {
if(err) return console.error(err);
console.log(`${files.length} Adet Register Komutu Yükleniyor.`);
files.forEach(async files => {
let props = require(`../commands/register-commands/${files}`);
client.commands.set(props.help.name, props);
props.conf.aliases.forEach(alias => {
client.aliases.set(alias, props.help.name);
});
});
});

fs.readdir("./commands/staff-commands/", (err, files) => {
if(err) return console.error(err);
console.log(`${files.length} Adet Staff Komutu Yükleniyor.`);
files.forEach(async files => {
let props = require(`../commands/staff-commands/${files}`);
client.commands.set(props.help.name, props);
props.conf.aliases.forEach(alias => {
client.aliases.set(alias, props.help.name);
});
});
});

fs.readdir("./events/register-events", (err, files) => {
if(err) return console.error(err);
console.log(`${files.length} Adet Register Events Dosyası Yükleniyor.`);
files.filter(file => file.endsWith(".js")).forEach(file => {
let prop = require(`../events/register-events/${file}`);
if(!prop.configuration) return;
client.on(prop.configuration.name, prop);
});
});

fs.readdir("./events/other-events", (err, files) => {
if(err) return console.error(err);
console.log(`${files.length} Adet Diğer Events Dosyası Yükleniyor.`);
files.filter(file => file.endsWith(".js")).forEach(file => {
let prop = require(`../events/other-events/${file}`);
if(!prop.configuration) return;
client.on(prop.configuration.name, prop);
});
});

};