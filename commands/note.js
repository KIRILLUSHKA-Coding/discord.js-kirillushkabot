const config = require('../botconfig.json')
const Discord = require('discord.js')
const colours = require('../colours.json')

module.exports.run = async (bot, message, args) => {
    let msg = message.content.split(`${config.prefix}note`).join(" ");

    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Новая Заметка')
    .addField('Вы заметили:', msg)
    .setTimestamp()
    .setFooter(`Бот сделан: KIRILLUSHKA`)
    
    const embed2 = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Заметка')
    .setDescription(`${message.author.tag}, Вам в личные сообщения была отправлена Ваша заметка.`)
    .setTimestamp()
    .setFooter(`Бот сделан: KIRILLUSHKA`)

    message.author.send(embed)
    message.channel.send(embed2)
}

module.exports.config = {
    name: 'заметка',
    description: 'Вы можете написать себе заметку в дискорд',
    usage: '?заметка',
    accessableby: 'everyone',
    aliases: []
}