const ms = require('ms');
const colours = require('../colours.json')

// const embedPerms = new Discord.MessageEmbed()
// .setColor(colours.red_light)
// .setTitle('Розыгрыш')
// .setDescription('Формат: ?giveaway <канал> <время**sec**/**min**/**h**/**d**>')
// .addField('Ошибка:', 'Недостаточно прав')
// .addField('Запросил:', message.author)
// .setTimestamp()
// .setFooter("Бот сделан: KIRILLUSHKA")

// const embedChannel = new Discord.MessageEmbed()
// .setColor(colours.red_light)
// .setTitle('Розыгрыш')
// .setDescription('Формат: ?giveaway <канал> <время**sec**/**min**/**h**/**d**>')
// .addField('Ошибка:', 'Укажите канал в котором будет розыгрыш')
// .addField('Запросил:', message.author)
// .setTimestamp()
// .setFooter("Бот сделан: KIRILLUSHKA")

// const embedTime = new Discord.MessageEmbed()
// .setColor(colours.red_light)
// .setTitle('Розыгрыш')
// .setDescription('Формат: ?giveaway <канал> <время**sec**/**min**/**h**/**d**>')
// .addField('Ошибка:', 'Укажите время розыгрыша')
// .addField('Запросил:', message.author)
// .setTimestamp()
// .setFooter("Бот сделан: KIRILLUSHKA")

// const embedWinners = new Discord.MessageEmbed()
// .setColor(colours.red_light)
// .setTitle('Розыгрыш')
// .setDescription('Формат: ?giveaway <канал> <время**sec**/**min**/**h**/**d**>')
// .addField('Ошибка:', 'Укажите число победителей в розыгрыше')
// .addField('Запросил:', message.author)
// .setTimestamp()
// .setFooter("Бот сделан: KIRILLUSHKA")

// const embedPrize = new Discord.MessageEmbed()
// .setColor(colours.red_light)
// .setTitle('Розыгрыш')
// .setDescription('Формат: ?giveaway <канал> <время**sec**/**min**/**h**/**d**>')
// .addField('Ошибка:', 'Укажите приз розыгрыша')
// .addField('Запросил:', message.author)
// .setTimestamp()
// .setFooter("Бот сделан: KIRILLUSHKA")

// const embedStartGw = new Discord.MessageEmbed()
// .setColor(colours.green_dark)
// .setTitle('Добавлен Розыгрыш')
// .addField('Канал:', channel)
// .addField('Время:', giveawayDuration)
// .addField('Количество Победителей:', giveawayWinners)
// .addField('Приз:', giveawayPrize)
// .addField('Добавил:', message.author)
// .setTimestamp()
// .setFooter("Бот сделан: KIRILLUSHKA")

module.exports = {
    name: "giveaway",
    description: "Начинает розыгрыщ",

    async run(client, message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embedPerms);

        let channel = message.mentions.channels.first();

        if (!channel) return message.channel.send(embedChannel);

        let giveawayDuration = args[1];

        if (!giveawayDuration || isNaN(ms(giveawayDuration))) return message.channel.send(embedTime);

        let giveawayWinners = args[2];

        if (isNaN(giveawayWinners) || (parseInt(giveawayWinners) <= 0)) return message.channel.send(embedWinners);

        let giveawayPrize = args.slice(3).join(" ");

        if (!giveawayPrize) return message.channel.send(embedPrize);

        client.giveawaysManager.start(channel, {
            time: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: giveawayWinners,
            hostedBy: client.config.hostedBy ? message.author : null,

            messages: {
                giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "") + "@everyone **РОЗЫГРЫШ**",
                giveawayEned: (client.config.everyoneMention ? "@everyone\n\n" : "") + "@here **КОНЕЦ РОЗЫГРЫША**",
                timeRemaining: "Время до окончания: **{duration}**",
                inviteToParticipate: "Нажми на реакцию 🎉 чтобы участвовать в розыгрыше",
                winMessage: "||@everyone|| Поздравляю {winners}, Вы/вы выиграли **{prize}**!",
                embedFooter: "Время розыгрыша!",
                noWinner: "Победитель не выбран!",
                hostedBy: "Добавлен {user}",
                winners: "Победитель(ли)",
                endedAt: "Ends at",
                units: {
                    seconds: "секунд",
                    minutes: "минут",
                    hours: "часов",
                    days: "дней",
                    pluralS: false
                }
            }
        })

        message.author.send(embedStartGw);
        message.react('✅')
    }
}