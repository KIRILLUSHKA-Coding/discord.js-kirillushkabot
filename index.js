const Discord = require('discord.js');
const bot = new Discord.Client();
const botconfig = require('./botconfig.json');
const colours = require('./colours.json');
const fs = require('promise-fs');
const client = bot;

const config = require('./botconfig.json');
client.config = config;

const { GiveawaysManager } = require('discord-giveaways');

client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

bot.commands = new Discord.Collection();

loadCommands().then(loaded => {
  console.log(`Загружено: ${loaded} файлов!`)  
})

bot.on('ready', () => {
    console.log(`${bot.user.username} вышел в сеть!`)
    bot.user.setActivity('канал "KIRILLUSHKA" | ?cmds', {type: 3})
})

async function loadCommands() {
  let dir = await fs.readdir('commands', {encoding: 'utf8'});
  let files = dir.filter(file => file.endsWith('.js'));

  files.forEach(file => {
    let cmd = require(`./commands/${file}`)
    bot.commands.set(file.split('.')[0], cmd)
  }) 

  return files.length ;
}

bot.on('message', (message) => {
  let prefix = '?'
  let arr = message.content.split(' ')
  let args = arr.slice(1);
  let commandName = arr[0].slice(prefix.length)

  let file = bot.commands.get(commandName)
  if(file) file.run(bot, message, args);
})


bot.on('guildMemberAdd', member => {
  const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === '〘🙂😟〙привет-пока')
  welcomeChannel.send(`${member} присоединился на сервер! Надеемся, что он подписался)`)
})
bot.on('guildMemberRemove', member => {
  const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === '〘🙂😟〙привет-пока')
  welcomeChannel.send(`${member} вышел из сервера! Надеемся, что он все-равно подписался)`)
})















bot.on('message', async message => {
    if(message.author.bot || message.channel.type === "dm") return;
    
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = messageArray.slice(1)

    if(cmd === '?bot-info' || cmd === '?bot'){

      let bIcon = bot.user.displayAvatarURL

      const botEmbed = new Discord.MessageEmbed()
      .setColor(colours.blue_light)
      .setTitle('Информация Бота')
      .setThumbnail(bIcon)
      .addField('Название:', bot.user.username)
      .addField('Создатель:', '<@656203867284963375>')
      .addField('Дата Создания:', bot.user.createdAt)

      message.channel.send(botEmbed)
    }







    if (cmd === '?server' || cmd === '?serverinfo' || cmd === '?server-info') {

      let serverIcon = message.guild.iconURL

      const serverEmbed = new Discord.MessageEmbed()
      .setColor(colours.blue_dark)
      .setTitle('Информация Севрера')
      .addField('Название:', message.guild.name)
      .addField('Дата Создания:', message.guild.createdAt)
      .addField('Всего Участников:', message.guild.memberCount)

        
      message.channel.send(serverEmbed)
    }








    if(cmd === '?partnership' || cmd === '?ps') {

      const pp = new Discord.MessageEmbed()
      .setColor(colours.blue_dark)
      .setTitle('Партнерская Программа')
      .setDescription('Партнерская Программа - это программа сервера которая позволяет партнерам рекламироваться им на нашем сервере, а нам на их.')
      .addField('Условия', 'Иметь на сервере 50+ человек;\nЧеловек отвечающий за партнерство с нашим сервером№\nНе иметь историю конфликтов на нашем севрере;\nПодавать заявку при соглашению всей администрации вашего сервера(не обязательно, если подает создатель).')
      .addField('Как отправить Заявку на ПП', 'Напишите на сервере команду ``?заявка-партнерская-программа <дополнительно>`` или ``?заявка-пп <дополнительно>`` или ``?зпп <дополнительно>``! Дополнительно - ссылка на Ваш сервер, информация и тп, писать обязательно!')
      .setTimestamp()
      .setFooter("Бот сделан: KIRILLUSHKA", 'https://imgur.com/a/WWF3yRi')


      message.author.send(pp)
    }







    if(cmd === '?request-partnershi' || cmd === '?rps' || cmd === '?request-ps') {

      const moreInfo = args.join(" ");

      const zpp = new Discord.MessageEmbed()
      .setColor(colours.blue_light)
      .setTitle('Новая Заявка на Партнерскую Программу')
      .addFields({name: 'Пользователь который Подает', value: `${message.author.username}`},
    {name: 'Дополнительно от Пользователя', value: `${moreInfo}`})
      .setTimestamp()
      .setFooter("Бот сделан: KIRILLUSHKA", 'https://imgur.com/a/WWF3yRi')

      const gozpp = new Discord.MessageEmbed()
      .setColor(colours.green_dark)
      .setTitle('Отправка Заявки на Партнерскую Программу')
      .setDescription('Вы отправили заявку на Партнерскую Программу. В течении суток с Вами свяжиться KIRILLUSHKA.')

      
      message.guild.owner.send(zpp)

      message.author.send(gozpp)
    }








  
    if(cmd === "?add-news") {

      const newsChannel = message.guild.channels.cache.find(channel => channel.name === '〘📰〙объявления')

      const sayFailPermissions = new Discord.MessageEmbed()
      .setColor(colours.red_light)
      .setTitle('Объявление')
      .setDescription('У Вас недостаточно прав, для использовании этой команды!')
      .setTimestamp()
      .setFooter("Бот сделан: KIRILLUSHKA", 'https://imgur.com/a/WWF3yRi')

      if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(sayFailPermissions)

      const sayMessage = args.join(" ");
      message.delete().catch(O_o=>{});

      const sayMessageEmbed = new Discord.MessageEmbed()
      .setColor(colours.cyan)
      .setTitle('Новое Объявление')
      .addFields({name: 'Объявитель', value: `${message.author.tag}`},
      {name: 'Объявление', value: `${sayMessage}`})
      .setTimestamp()
      .setFooter("Бот сделан: KIRILLUSHKA", 'https://imgur.com/a/WWF3yRi')

  
      newsChannel.send(sayMessageEmbed);
      
    }









    if(cmd === "?clear") {
      
      const clearFail = new Discord.MessageEmbed()
      .setColor(colours.red_light)
      .setTitle('Очистка')
      .setDescription('Введите значение аргумента, которое надо очистить, от ``2`` до ``100``!')
      .setTimestamp()
      .setFooter("Бот сделан: KIRILLUSHKA", 'https://imgur.com/a/WWF3yRi')

      const clearFailPermissios = new Discord.MessageEmbed()
      .setColor(colours.red_light)
      .setTitle('Очистка')
      .setDescription('У Вас недостаточно прав, для использования этой команды!')
      .setTimestamp()
      .setFooter("Бот сделан: KIRILLUSHKA", 'https://imgur.com/a/WWF3yRi')

      if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(clearFailPermissios)

      const deleteCount = parseInt(args[0], 10);
      
      if(!deleteCount || deleteCount < 2 || deleteCount > 100)
        return message.channel.send(clearFail);
      
      const fetched = await message.channel.messages.fetch({limit: deleteCount});
      message.channel.bulkDelete(fetched)
        .catch(error => message.reply(`Произошла ошибка: ${error}`));

      // Лог
      const clearChannelLog = message.guild.channels.cache.find(channel => channel.name === 'логи')
      if(!clearChannelLog) return;

      const clearLog = new Discord.MessageEmbed()
      .setColor(colours.green_dark)
      .setTitle('Очистка Сообщений')
      .addField('Пользователь:', message.author.tag)
      .addField('Количество Удаленных Сообщений', deleteCount)
      .addField('Удалено в Канале:', message.channel)
      .addField('Время Удаления:', message.createdAt)
      .setTimestamp()
      .setFooter("Бот сделан: KIRILLUSHKA")
      
      clearChannelLog.send(clearLog)
      // ===
    }






    if(cmd === '?help' || cmd === '?cmds'){

      const embed = new Discord.MessageEmbed()
      .setColor(colours.orange)
      .setTitle('Команды Бота Севрера | KIRILLUSHKA Bot - [?]')
      .addFields(
        {name: 'Информация:', value: '``?cmds`` - ``команды бота севрера``\n ``?serverinfo`` - ``информация о сервере``\n ``?user`` - ``информация о пользователе``\n``?administration`` - ``список всей администрации сервера``'},
        {name: 'Завки:', value: '``?report`` - ``написать жалобу на игрока``\n``?idea`` - ``напишите идею для видео/сервера``\n``?note`` - ``сделайте заметку, чтобы ничего не забыть``'},
        {name: 'Развлекательные:', value: '``?random`` - ``рандомное число от 0 до 10``\n``?8ball`` - ``спроси вопросы у магического шара``\n``?avatar`` - ``ссылка на аватар пользователя``'},
        {name: 'Экономика:', value: '*в разработке*b'},
        {name: 'Партнерская Программа', value: '``?partnership`` - ``ознакомление с партнерской программой``\n``?request-ps`` - ``написать заявку на партнерскую программу``'},
        {name: 'Администрация:', value: '``?kick`` - ``исключение пользователя из сервера``\n``?ban`` - ``блокировка пользователя на сервере``\n``?clear`` - ``очистить сообщения``\n``?add-news`` - ``написать объявление``\n``?giveaway`` - ``создать розыгрыш``'},
      )
      .setTimestamp()
      .setFooter("Бот сделан: KIRILLUSHKA")

      message.channel.send(embed)
    }









    if(cmd === "?random") {
      
      const embed = new Discord.MessageEmbed()
      .setColor(colours.yellow)
      .setTitle('Рандомное Число')
      .setDescription(`Рандомное число: **${Math.floor(Math.random() * 10 + 1)}**`)
      .setTimestamp()
      .setFooter("Бот сделан: KIRILLUSHKA")

      message.channel.send(embed)
    }







    if(cmd === '?report'){
      let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
      if(!rUser) return message.channel.send('Не найдено пользователя, которого вы упомянули!')
      let reason = args.join(' ').slice(22)

      let reportEmbed = new Discord.MessageEmbed()
      .setTitle('Новая Жалоба')
      .setColor(colours.red_dark)
      .addField('Жалоба От:', `${message.author} | ${message.author.id}`)
      .addField('Жалоба На:', `${rUser} | ${rUser.id}`)
      .addField('Причина:', reason)
      .addField('Подача с Канала:', message.channel)
      .setTimestamp()
      .setFooter("Бот сделан: KIRILLUSHKA")

      const reportsChannel = message.guild.channels.cache.find(channel => channel.name === '〘💭〙жалобы')
      if(!reportsChannel) return console.log('Не найдено текстовый канал!')
      
      message.delete().catch(O_o=>{})
      reportsChannel.send({embed: reportEmbed}).then(reportEmbed => {
        reportEmbed.react("✅");
        reportEmbed.react("❌");
        reportEmbed.react("🕛");
      });

      return;
    }






    if(cmd === '?avatar'){
      let member = message.mentions.users.first() || message.author
      if(!member) return message.channel.send('Не найдено пользователя, которого Вы упомянули')

      const embedAvatar = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Аватар Пользователя')
      .setThumbnail(member.displayAvatarURL())
      .addField("Ссылка на Аватар:", member.displayAvatarURL()) 
      .setTimestamp()
      .setFooter('Бот сделан: KIRILLUSHKA')

      message.channel.send(embedAvatar)

    }










    if(cmd === '?idea') {

      const ideasChannel = message.guild.channels.cache.find(channel => channel.name === '〘🤔〙предложения')

      const idea = args.join(" ")

      const ideaEmbed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Новое Предложение')
      .addField('Предложение От:', `${message.author} | ${message.author.id}`)
      .addField('Предложение:', idea)
      .setTimestamp()
      .setFooter("Бот сделан: KIRILLUSHKA")

      message.delete().catch(O_o=>{})
      ideasChannel.send({embed: ideaEmbed}).then(ideaEmbed => {
        ideaEmbed.react("🟢");
        ideaEmbed.react("🟡");
        ideaEmbed.react("🔴");
      });
      
    }
    
    





    if(cmd === '?kick'){

      let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
      if(!kUser) return message.channel.send('Не найдено пользователя, которого Вы упомянули')
      let kReason = args.join(' ').slice(22)
      if(!message.member.hasPermission('PRIORITY_SPEAKER')) return message.channel.send('У Вас недостаточно прав!')
      if(kUser.hasPermission('PRIORITY_SPEAKER')) return message.channel.send('Этого пользователя нельзя кикнуть!')

      let kickEmbed = new Discord.MessageEmbed()
      .setColor(colours.orange)
      .setTitle('Наказание: Исключение')
      .addField('Пользователем:', `${message.author} | ${message.author.id}`)
      .addField('Пользователь:', `${kUser} | ${kUser.id}`)
      .addField('Причина:', kReason)

      let kickLogChannel = message.guild.channels.cache.find(channel => channel.name === 'логи')
      if(!kickLogChannel) return console.log('Не найдено текстовый канал!')

      message.react('✅')
      message.guild.member(kUser).kick(kReason)
      kickLogChannel.send(kickEmbed)

      return;
    }







    if(cmd === '?ban'){

      let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
      if(!bUser) return message.channel.send('Не найдено пользователя, которого Вы упомянули')
      let bReason = args.join(' ').slice(22)
      if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('У Вас недостаточно прав!')
      if(bUser.hasPermission('KICK_MEMBERS')) return message.channel.send('Этого пользователя нельзя кикнуть!')

      let banEmbed = new Discord.MessageEmbed()
      .setColor(colours.red_light)
      .setTitle('Наказание: Блокировка')
      .addField('Пользователем:', `${message.author} | ${message.author.id}`)
      .addField('Пользователь:', `${bUser} | ${bUser.id}`)
      .addField('Причина:', bReason)

      let banLogChannel = message.guild.channels.cache.find(channel => channel.name === 'логи')
      if(!banLogChannel) return console.log('Не найдено текстовый канал!')

      message.react('✅')
      message.guild.member(bUser).ban(bReason)
      banLogChannel.send(banEmbed)

      return;
    }

    if(cmd === '?administration' || cmd === '?adm'){

      const embed = new Discord.MessageEmbed()
      .setColor(colours.yellow)
      .setTitle('Список Администрации Сервера')
      .setDescription('Здесь описана вся администрация нашего сервера, если Вам кто-то говорит, что он из администрации, без роли), то тут можете проверить!')
      .addField(`KIRILLUSHKA#4937 - Создатель`, `Дата Поступления: ∞\nID: 656203867284963375\nПринятых жалоб: 0\nВыговоров: 0\nРепутация: 100/100%`)
      .addField(`Ŧøթҹนķ#4255 - Зам. Создателя`, `Дата Поступления: 04.01.2020\nID: 589026620728147979\nПринятых жалоб: 1\nВыговоров: 0\nРепутация: 100/100%`)
      .addField(`FLex#8256 - Вице-Зам. Создателя`, `Дата Поступления: 01.03.2020\nID: 581770197040627713\nПринятых жалоб: 0\nВыговоров: 0\nРепутация: 0/100%`)
      .addField(`ZeFFi <33#9824 - Тех. Администратор`, `Дата Поступления: 01.03.2020\nID: 538252002203795478\nПринятых жалоб: 0\nВыговоров: 0\nРепутация: 50/100%`)
      .addField(`Ти сажраль жидкий щакалад?#3810 - Стажер-Модератор`, `Дата Поступления: 02.04.2020\nID: 423354407447429130\nПринятых жалоб: 0\nВыговоров: 0\nРепутация: 0/100%`)
      .addField(`Maks_Rus5775#4993 - Стажер-Модератор`, `Дата Поступления: \nID: 686506383323299841\nПринятых жалоб: 0\nВыговоров: 0\nРепутация: 0/100%`)
      .setTimestamp()
      .setFooter('Бот сделан: KIRILLUSHKA')

      const embed2 = new Discord.MessageEmbed()
      .setColor(colours.yellow)
      .setTitle('Список Администрации Сервера')
      .setDescription('Список отправлен Вам в личные сообщения!')
      .setTimestamp()
      .setFooter('Бот сделан: KIRILLUSHKA')

      message.channel.send(embed2)
      message.author.send(embed)
    }

    






   if(cmd === '?user'){

      let member = message.mentions.users.first() || message.author
      if(!member) return message.channel.send('Не найдено пользователя, которого Вы упомянули')

      const embed = new Discord.MessageEmbed()
      .setColor(colours.blue_dark)
      .setTitle('Информация о Пользователе')
      .setThumbnail(member.displayAvatarURL())
      .addField('Никнейм:', member.tag)
      .addField('ID:', member.id)
      .addField('Статус:', member.presence.status)
      .addField('Дата Регистрации в Discord:', member.createdAt)
      .setTimestamp()
      .setFooter('Бот сделан: KIRILLUSHKA')
      

      message.channel.send(embed)

    }
    

})  
















































// Логи
bot.on('guildMemberAdd', member => {
  const welcomeChannelLog = member.guild.channels.cache.find(channel => channel.name === 'логи')

  const welcomeLog = new Discord.MessageEmbed()
  .setColor(colours.green_dark)
  .addFields({name: 'Вход Пользователя:', value: `${member}`})
  .setTimestamp()
  .setFooter("Бот сделан: KIRILLUSHKA")

  welcomeChannelLog.send(welcomeLog)
})

bot.on('guildMemberRemove', member => {
  const welcomeChannelLog = member.guild.channels.cache.find(channel => channel.name === 'логи')

  const welcomeLog = new Discord.MessageEmbed()
  .setColor(colours.red_light)
  .setTitle('Выход Пользователя:')
  .addFields({name: 'Пользователь:', value: `${member}`})
  .setTimestamp()
  .setFooter("Бот сделан: KIRILLUSHKA")

  welcomeChannelLog.send(welcomeLog)
})

bot.on('messageDelete', async message => {
  const deletemessageChannelLog = message.guild.channels.cache.find(channel => channel.name === 'логи')
  if(!deletemessageChannelLog) return;

  const deletemessageLog = new Discord.MessageEmbed()
  .setTitle('Удаление Сообщения:')
  .setColor(colours.red_dark)
  .addField('Пользователь Удаленного Сообщения:', message.author.username)
  .addField('Сообщение', message)
  .addField('Удалено в Канале', message.channel)
  .addField('Время Удаления', message.createdAt)
  .setTimestamp()
  .setFooter("Бот сделан: KIRILLUSHKA")

  deletemessageChannelLog.send(deletemessageLog)
})

bot.on('messageUpdate', async(oldMessage, newMessage) => {
  if(oldMessage.content === newMessage.content){
    return;
  }
  const editmessageChannelLog = newMessage.guild.channels.cache.find(channel => channel.name === 'логи')
  if(!editmessageChannelLog) return;

  const editmessageLog = new Discord.MessageEmbed()
  .setTitle('Редактирование Сообщения')
  .setColor(colours.orange)
  .addFields({name: 'Сообщение до Редактирования:', value: oldMessage},
  {name: 'Сообщение после Редактирования:', value: newMessage})
  .setTimestamp()
  .setFooter("Бот сделан: KIRILLUSHKA")

  editmessageChannelLog.send(editmessageLog)
})

bot.login(process.env.F4hmVU8T9-P7yWq3j3pYZfj53ywITgdT)


