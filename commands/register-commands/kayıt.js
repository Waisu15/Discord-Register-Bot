const config = require("../../data/config.json"); 
const Discord = require("discord.js");
const db = require("quick.db");

let tik = config.EMOJİ.tik;
let red = config.SETTİNGS.red;
let tag = config.SETTİNGS.tag;
let log = config.SETTİNGS.log;
let çarpı = config.EMOJİ.çarpı;
let prefix = config.BOT.prefix;
let girl = config.SETTİNGS.kız;
let chat = config.SETTİNGS.chat;
let boys = config.SETTİNGS.erkek;
let girl2 = config.SETTİNGS.kız2;
let girl3 = config.SETTİNGS.kız3;
let rules = config.SETTİNGS.rules;
let color = config.SETTİNGS.color;
let boys2 = config.SETTİNGS.erkek2;
let boys3 = config.SETTİNGS.erkek3;
let tagrol = config.SETTİNGS.tagrol;
let kayıtsız = config.SETTİNGS.kayıtsız;
let register = config.SETTİNGS.register;
let boyscolor = config.SETTİNGS.boyscolor;
let girlcolor = config.SETTİNGS.girlcolor;

exports.run = async (client, message, args) => {
  
let isim = args[1];
let yaş = args[2];
let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(register)) return message.channel.send(`${çarpı} Bu Komutu Kullanabilmek İçin Yeterli Yetkin Bulunmamaktadır.`).then(x => x.delete({timeout: 5000}));
if(!member) return message.channel.send(`${çarpı} Lütfen Bir Kullanıcıyı Etiketleyiniz.`).then(x => x.delete({timeout: 5000}));
if(member.id === message.author.id) return message.channel.send(`${çarpı} Kendi Üzerinde İşlem Yapamazsın.`).then(x => x.delete({timeout: 5000}));
if(member.user.bot) return message.channel.send(`${çarpı} Botlar Üzerinde İşlem Yapamazsın.`).then(x => x.delete({timeout: 5000}));

if(member.id === message.guild.OwnerID) return message.channel.send(`${çarpı} Sunucu Sahibini Üzerinde İşlem Yapamazsın.`).then(x => x.delete({timeout: 5000}));
if(!member.roles.cache.has(kayıtsız)) return message.channel.send(`${çarpı} Etiketlediğiniz veya ID sini Girdiğiniz Kullanıcıda Kayıtsız Rolü Bulunmamaktadır.`).then(x => x.delete({timeout: 5000}));
if(!isim) return message.channel.send(`${çarpı} Lütfen Bir İsim Belirtiniz.`).then(x => x.delete({timeout: 5000}));
if(!yaş) return message.channel.send(`${çarpı} Lütfen Bir Yaş Belirtiniz.`).then(x => x.delete({timeout: 5000}));

message.react("👨").then(r => { 

const waisu = (reaction, user) => reaction.emoji.name == "👨" && user.id == message.author.id;
const waisu2 = message.createReactionCollector(waisu);

waisu2.on("collect", async (r) => {

message.delete();

setTimeout(() => {
member.setNickname(`${tag} ${isim} ' ${yaş}`);
}, 100);
  
setTimeout(() => {
member.roles.cache.has(tagrol) ? member.roles.set([tagrol, boys, boys2, boys3]) : member.roles.set([boys, boys2, boys3]);
}, 200);

db.add(`kayıt_${message.author.id}`, 1);
db.add(`ekayıt_${message.author.id}`, 1);
db.push(`isim_${member.id}`, { userID: member.id, nick: `${tag} ${isim} ' ${yaş}`, role: boys, yapan: message.author.id });

message.channel.send(`${member} Adlı Kullanıcı Başarıyla Erkek Olarak Kayıt Edildi.`);

setTimeout(() => {
client.channels.cache.get(rules).send(`${member}`).then(x => x.delete({timeout: 1000}));
}, 1000);

setTimeout(() => {
client.channels.cache.get(chat).send(`${member} Sunucumuza Hoşgeldin!`);
}, 1000);

const embed = new Discord.MessageEmbed()
.setColor(boyscolor)
.setDescription(`**${member} Adlı Kullanıcı <@&${boys}> Olarak Kayıt Edildi!**

Yetkili ${message.author} - (\`${message.author.id}\`)
Kullanıcı ${member} - (\`${member.id}\`)
Kullanıcının Eski İsmi \`${member.user.username}\`
Kullanıcının Yeni İsmi \`${tag} ${isim} ' ${yaş}\``)
.setThumbnail(member.user.avatarURL({ dynamic: true}))
.setFooter("Developer Waisu")
.setTimestamp()
client.channels.cache.get(log).send(embed);
});
});

message.react("❌").then(r => { 

const waisu = (reaction, user) => reaction.emoji.name == "❌" && user.id == message.author.id;
const waisu2 = message.createReactionCollector(waisu);
    
waisu2.on("collect", async (r) => {

message.delete();

message.channel.send(`${çarpı} Kayıt İşlemi Başarıyla İptal Edildi.`).then(x => x.delete({timeout: 5000}));
});
});

message.react("👩").then(r => { 

const waisu = (reaction, user) => reaction.emoji.name == "👩" && user.id == message.author.id;
const waisu2 = message.createReactionCollector(waisu)

waisu2.on("collect", async (r) => {

message.delete();

setTimeout(() => {
member.setNickname(`${tag} ${isim} ' ${yaş}`);
}, 100);
  
setTimeout(() => {
member.roles.cache.has(tagrol) ? member.roles.set([tagrol, girl, girl2, girl3]) : member.roles.set([girl, girl2, girl3]);
}, 200);

db.add(`kayıt_${message.author.id}`, 1);
db.add(`kkayıt_${message.author.id}`, 1);
db.push(`isim_${member.id}`, { userID: member.id, nick: `${tag} ${isim} ' ${yaş}`, role: girl, yapan: message.author.id });

message.channel.send(`${member} Adlı Kullanıcı Başarıyla Kız Olarak Kayıt Edildi.`);

setTimeout(() => {
client.channels.cache.get(rules).send(`${member}`).then(x => x.delete({timeout: 1000}));
}, 1000);

setTimeout(() => {
client.channels.cache.get(chat).send(`${member} Sunucumuza Hoşgeldin!`);
}, 1000);

const embed14 = new Discord.MessageEmbed()
.setColor(girlcolor)
.setDescription(`**${member} Adlı Kullanıcı <@&${girl}> Olarak Kayıt Edildi!**

Yetkili ${message.author} - (\`${message.author.id}\`)
Kullanıcı ${member} - (\`${member.id}\`)
Kullanıcının Eski İsmi \`${member.user.username}\`
Kullanıcının Yeni İsmi \`${tag} ${isim} ' ${yaş}\``)
.setThumbnail(member.user.avatarURL({dynamic: true}))
.setFooter("Developer Waisu")
.setTimestamp()
client.channels.cache.get(log).send(embed14);
});
});
};
 
exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["k"]
};

exports.help = {
name: "kayıt"
};