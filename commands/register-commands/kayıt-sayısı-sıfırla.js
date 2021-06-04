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

if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`${çarpı} Bu Komutu Kullanabilmek İçin Yeterli Yetkin Bulunmamaktadır.`).then(x => x.delete({timeout: 10000}));
if(!member) return message.channel.send(`${çarpı} Lütfen Bir Kullanıcıyı Etiketleyiniz.`).then(x => x.delete({timeout: 10000}));
if(!member.roles.highest.position >= message.member.roles.highest.position) message.channel.send(`${çarpı} Etiketlediğiniz Kullanıcı Sizinle Aynı veya Üst Pozisyondadır.`).then(x => x.delete({timeout: 10000}));
   
db.delete(`kayıt_${member.id}`);
db.delete(`kkayıt_${member.id}`);
db.delete(`ekayıt_${member.id}`);

message.channel.send(`${tik} ${member} Adlı Kullanıcının Kayıt Verileri Başarıyla Temizlendi.`);
};

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["kayıtsayısı-sıfırla", "ks-sıfırla"]
};

exports.help = {
name: "kayıt-sayısı-sıfırla"
};