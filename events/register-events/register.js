const config = require("../../data/config.json"); 
const {client} = require("../../bot.js");
const Discord = require("discord.js");
const moment = require("moment");
const db = require("quick.db");
moment.locale("tr");

let red = config.SETTİNGS.red;
let tag = config.SETTİNGS.tag;
let color = config.SETTİNGS.color;
let tagrol = config.SETTİNGS.tagrol;
let server = config.SETTİNGS.server;
let register = config.SETTİNGS.register;
let channels = config.SETTİNGS.channels;
let kayıtsız = config.SETTİNGS.kayıtsız;
let confirmation = config.SETTİNGS.confirmation;

client.on("guildMemberAdd", async member => {
if(member.guild.id == server) {

if(member.user.bot) return client.channels.cache.get(channels).send(`${member} Adlı Kişi Bot Oluğu İçin Registerleri Etiketlemedim!`);

setTimeout(() => {
member.roles.add(kayıtsız);
}, 100)

setTimeout(() => {
member.setNickname(`${tag} İsim ' Yaş`);
}, 200)

client.channels.cache.get(channels).send(`
**Merhaba ${member} - (\`${member.id}\`) Sunucumuza Hoşgeldin!**
Seninle Birlikte Toplam **${member.guild.memberCount}** Kişiye Ulaştık!
Hesabın ${moment(member.user.createdAt).format("**DD MMMM dddd YYYY** / **hh.mm.ss**")} Tarihinde Kurulmuştur.
Müsait Olduğun Zaman <#${confirmation}> Odalarından Birine Geçip Kaydını Yaptırabilirsin.
<@&${register}> Rolündeki Yetkililer Seninle İlgilenicektir.
Bu Kullanıcı \`Güvenli\` Gözüküyor.
Sunucumuza Kayıt Oldukdan Sonra Kuralları Okumayı Sakın Unutma!
Tagımızı Alarak \`${tag}\` Bizlere Destek Olabilir ve \`${member.guild.roles.cache.get(tagrol).name}\` Rolüne Sahip Olabilirsin.`, 
new Discord.MessageAttachment("https://cdn.discordapp.com/attachments/848943473268490250/849073132533841960/20210601_025201.jpg"));
};

});