const config = require("../../data/config.json"); 
const Discord = require("discord.js");
const db = require("quick.db");

let tik = config.EMOJİ.tik;
let red = config.SETTİNGS.red;
let çarpı = config.EMOJİ.çarpı;
let color = config.SETTİNGS.color;
let register = config.SETTİNGS.register;

exports.run = async (client, message, args) => {
  
if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(register)) return message.channel.send(`${çarpı} Bu Komutu Kullanabilmek İçin Yeterli Yetkin Bulunmamaktadır.`).then(x => x.delete({timeout: 5000}));

let sira = 1
const data = message.guild.members.cache.filter(m => db.has(`kayıt_${m.user.id}`) && !m.user.bot).array().sort((a, b) => { return (db.get(`kayıt_${b.user.id}`) || 0) - (db.get(`kayıt_${a.user.id}`) || 0) });
const top = data.splice(0, args[1] || 15);
const text = top.map(s => `• \`${sira++}.\` - <@${s.user.id}> \`${db.get(`kayıt_${s.user.id}`) || 0} Kayıt\` [\`${db.get(`kkayıt_${s.user.id}`) || 0} Kız\`, \`${db.get(`ekayıt_${s.user.id}`) || 0} Erkek\`]`).join('\n')

const embed = new Discord.MessageEmbed()
.setColor(color)
.setAuthor(`${message.guild.name} Toplam Kayıt İstatistikleri`)
.setDescription(text || `• Kayıt İstatistikleri Bulunamadı.`)
.setFooter("Developer Waisu")
.setTimestamp()
message.channel.send(embed)
};

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["tks"]
};

exports.help = {
name: "toplam-kayıt-sayısı"
};