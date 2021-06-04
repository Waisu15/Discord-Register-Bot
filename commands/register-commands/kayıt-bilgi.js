const config = require("../../data/config.json"); 
const Discord = require("discord.js");
const db = require("quick.db");

let tik = config.EMOJİ.tik;
let red = config.SETTİNGS.red;
let çarpı = config.EMOJİ.çarpı;
let color = config.SETTİNGS.color;
let register = config.SETTİNGS.register;

exports.run = async (client, message, args) => {

let sayi = 1;
let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(register)) return message.channel.send(`${çarpı} Bu Komutu Kullanabilmek İçin Yeterli Yetkin Bulunmamaktadır.`).then(x => x.delete({timeout: 5000}));
if(!member) return message.channel.send(`${çarpı} Lütfen Bir Kullanıcı Etiketleyin veya Bir ID Belirtin.`).then(x => x.delete({timeout: 5000}));

let data = await db.get(`isim_${member.id}`);

if(!data) return message.channel.send(`${çarpı} Belirttiğiniz Kullanıcıc KAyıt Bilgisi Bulunmamaktadır.`).then(x => x.delete({timeout: 5000}));

let isimler = data.filter(x => x.userID === member.id).map(x => `\`${sayi++}\` - \`${x.nick}\` (<@&${x.role}>) (<@${x.yapan}>)`).join("\n");

const embed4 = new Discord.MessageEmbed()
.setColor(color) 
.setAuthor(`${message.guild.name} Kayıt Bilgisi`)  
.setDescription(`**Bu Kullanıcı \`${sayi-1 || 0}\` Kere Kayıt Olmuş**

${isimler || "Kullanıcı Hiç Kayıt Olmamış"}`)
.setThumbnail(member.user.avatarURL({dynamic: true}))  
.setFooter(`Developer Waisu`)
.setTimestamp()
message.channel.send(embed4);
};

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["kayıtbilgi", "kb"]
};

exports.help = {
name: "kayıt-bilgi"
};