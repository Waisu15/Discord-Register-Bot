const config = require("../../data/config.json"); 
const Discord = require("discord.js");
const db = require("quick.db");

let tik = config.EMOJİ.tik;
let red = config.SETTİNGS.red;
let çarpı = config.EMOJİ.çarpı;
let color = config.SETTİNGS.color;
let register = config.SETTİNGS.register;

exports.run = async (client, message, args) => {
  
if(message.member.permissions.has("ADMINISTRATOR")) { var member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0])) || message.author; } else { var member = message.member }
let total = await db.get(`kayıt_${member.id}`) || 0;
let girl = await db.get(`kkayıt_${member.id}`) || 0;
let boys = await db.get(`ekayıt_${member.id}`) || 0;

const embed = new Discord.MessageEmbed()
.setColor(color)
.setAuthor(`${message.guild.name} Kayıt İstatistikleri`)
.setDescription(`**${member} Adlı Yetkilinin Kayıt Sayısı**

Kız Kayıt Sayısı \`${girl}\`
Erkek Kayıt Sayısı \`${boys}\`
Toplam Kayıt Sayısı \`${total}\``)
.setFooter("Developer Waisu")
.setThumbnail(member.avatarURL({dynamic: true}))
.setTimestamp()
message.channel.send(embed);
};

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["ks"]
};

exports.help = {
name: "kayıt-sayısı"
};