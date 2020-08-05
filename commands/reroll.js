const ms = require('ms');
const colours = require('../colours.json')



// const embedPerms = new Discord.MessageEmbed()
// .setColor(colours.red_light)
// .setTitle('Розыгрыш')
// .setDescription('Формат: ?reroll <ID/название сообщения>')
// .addField('Ошибка:', 'Недостаточно прав')
// .addField('Запросил:', message.author)
// .setTimestamp()
// .setFooter("Бот сделан: KIRILLUSHKA")

// const embedId = new Discord.MessageEmbed()
// .setColor(colours.red_light)
// .setTitle('Розыгрыш')
// .setDescription('Формат: ?reroll <ID/название сообщения>')
// .addField('Ошибка:', 'Укажите ID сообщения')
// .addField('Запросил:', message.author)
// .setTimestamp()
// .setFooter("Бот сделан: KIRILLUSHKA")

// const embedMessage = new Discord.MessageEmbed()
// .setColor(colours.red_light)
// .setTitle('Розыгрыш')
// .setDescription('Формат: ?reroll <ID/название сообщения>')
// .addField('Ошибка:', 'Сообщения не найдено по ID или названию')
// .addField('Запросил:', message.author)
// .setTimestamp()
// .setFooter("Бот сделан: KIRILLUSHKA")

// const rerolled = new Discord.MessageEmbed()
// .setColor(colours.green_dark)
// .setTitle('Розыгрыш')
// .setDescription('Победитель был переизбран!')
// .addField('Запросил:', message.author)
// .setTimestamp()
// .setFooter("Бот сделан: KIRILLUSHKA")




module.exports = {
    name: "reroll",
    description: "Перекручивает победителя в giveaways",

    async run (client, message, args){

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embedPerms);

        if(!args[0]) return message.channel.send(embedId);

        let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(" ")) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if(!giveaway) return message.channel.send(embedMessage);

        client.giveawaysManager.reroll(giveaway.messageID)
        .then(() => {
            message.channel.send(rerolled)
        })
        .catch((e) => {
            if(e.startsWith(`Розыгрыш(${giveaway.messageID}) не был закончен!`)){
                message.channel.send('Розыгрыш еще не закончен!')
            } else {
                console.error(e);
                message.channel.send('Произошла ошибка!')
            }
        })
    }
}