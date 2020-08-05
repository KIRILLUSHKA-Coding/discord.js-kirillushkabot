const config = require('../botconfig.json')
const Discord = require('discord.js')
const colours = require('../colours.json')

module.exports.run = async(bot, message, args) => {
    let question = message.content.split(`${config.prefix}8ball`).join(" ")
    let results = ['Я не знаю', "Да", "Нет"]
    let result = Math.floor((Math.random() * results.length))

    const embed = new Discord.MessageEmbed()
    .setColor(colours.green_dark)
    .setTitle('Магический Шар')
    .addField(`Твой Вопрос:`, question)
    .addField(`Магический Шар говорит:`, results[result])
    .addField('Вопрос от:', message.author.tag)
    .setTimestamp()
    .setFooter(`Бот сделан: KIRILLUSHKA`)
    message.channel.send(embed)

}

module.exports.config = {
    name: 'шар',
    description: 'Отвечает на твой вопрос',
    usage: '?8ball {question}',
    accessableby: 'everyone',
    aliases: []
}