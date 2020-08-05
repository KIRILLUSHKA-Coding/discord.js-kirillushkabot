const config = require('../botconfig.json')
const Discord = require('discord.js')
const colours = require('../colours.json')

module.exports.run = async(bot, message, args) => {
    let target = message.content.split(`${config.prefix}ship`).join(" ")
    let results = ['Враги - 0%',"Мелкая Дружба - 22%","Дружба - 34%","Крепкая Дружба - 45%","Крепкая Дружба - 50%","Очень Тесные Отношения - 60%","Встречаетесь - 69%","Пара - 70%","На одну ночь - 80%","Любовь - 100%"]
    let result = Math.floor((Math.random() * results.length))

    const embed = new Discord.MessageEmbed()
    .setColor(colours.pink)
    .addField('Результат:', results[result])
    .setTimestamp()
    .setFooter(`Бот сделан: KIRILLUSHKA`)

    message.channel.send(`**МИШЕНИ**\n:small_red_triangle_down: ${message.author}\n:small_red_triangle:${target}\n`)
    message.channel.send(embed)
}

module.exports.config = {
    name: 'шип',
    description: 'Только для шипперов :}',
    usage: '?шип',
    accessableby: 'everyone',
    aliases: []
}