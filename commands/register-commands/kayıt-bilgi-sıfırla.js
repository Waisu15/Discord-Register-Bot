const config = require("../../data/config.json"); 
const Discord = require("discord.js");
const db = require("quick.db");

let tik = config.EMOJİ.tik;
let red = config.SETTİNGS.red;
let çarpı = config.EMOJİ.çarpı;
let color = config.SETTİNGS.color;
let register = config.SETTİNGS.register;

exports.run = async (client, message, args) => {
  
let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(register)) return message.channel.send(`${çarpı} Bu Komutu Kullanabilmek İçin Yeterli Yetkin Bulunmamaktadır.`).then(x => x.delete({timeout: 10000}));
if(!member) return message.channel.send(`${çarpı} Lütfen Bir Kullanıcıyı Etiketleyiniz.`).then(x => x.delete({timeout: 10000}));
if(!member.roles.highest.position >= message.member.roles.highest.position) message.channel.send(`${çarpı} Etiketlediğiniz Kullanıcı Sizinle Aynı veya Üst Pozisyondadır.`).then(x => x.delete({timeout: 10000}));
   
db.delete(`isim_${member.id}`);

message.channel.send(`${tik} ${member} Adlı Kullanıcının Eski Kayıt Verileri Başarıyla Temizlendi.`);
};

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["kayıtbilgi-sıfırla", "kb-sıfırla"]
};

exports.help = {
name: "kayıt-bilgi-sıfırla"
};