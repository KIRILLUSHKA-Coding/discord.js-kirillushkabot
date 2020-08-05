// const db = require('quick.db');
// const Discord = require('discord.js');



// const embedBalance = new Discord.MessageEmbed()
// .setColor(colours.red_light)
// .setTitle('Экономика: Баланс')
// .addField(`Баланс ${user}:`, `${bal} коинов`)
// .setTimestamp()
// .setFooter("Бот сделан: KIRILLUSHKA")




// module.exports = {
//     name: "bal",
//     description: "bleh",

//     async run (client, message, args) {

//         let user = message.mentions.users.first() || message.author;

//         let bal = await db.fetch(`money_${message.guild.id}_${user.id}`);
//         if(bal === null) bal = 0;

//         //message.channel.send(`${user} curently has ${bal} coins`)
//         message.channel.send(embedBalance)

//     }
// }