//const Discord = require('discord.js')
//const client = new Discord.Client()
const sqlite = require('sqlite');
const commando = require('discord.js-commando')
const { prefix, token } = require('./config.json');

const client = new commando.Client({
    owner: '305722491471659011',
    commandPrefix: prefix
});

//https://discordapp.com/oauth2/authorize?client_id=576871428650172457&scope=bot


const path = require('path');

client.registry
    // Registers your custom command groups
    .registerGroups([
        ['fun', 'Fun commands'],
        ['some', 'Some group'],
        ['other', 'Some other group']
    ])
    // Registers all built-in groups, commands, and argument types
    .registerDefaults()
    // Registers all of your commands in the ./commands/ directory
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.setProvider(
    sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new commando.SQLiteProvider(db))
).catch(console.error);


client
	.on('error', console.error)
	.on('warn', console.warn)
	.on('debug', console.log)
	.on('ready', () => {
		console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
	})
	.on('disconnect', () => { console.warn('Disconnected!'); })
	.on('reconnecting', () => { console.warn('Reconnecting...'); })
	.on('commandError', (cmd, err) => {
		if(err instanceof commando.FriendlyError) return;
		console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
	})

// client.on('ready', () => {
//     // List servers the bot is connected to
//     console.log("Servers:")
//     client.guilds.forEach((guild) => {
//         console.log(" - " + guild.name)
//     })
// })

// client.on('message', message => {
//     if (!message.content.startsWith(prefix) || message.author.bot) return;
//     const args = message.content.slice(prefix.length).split(' ');
//     const command = args.shift().toLowerCase();

//     console.log("Message:" + message.content)
// 	if (command === `ping`) {
//         message.channel.send('Pong.');
//     } else if (command === `beep`) {
//         message.channel.send('Boop.');
//     } else if (command === `chat`) {
//         // send message to wit

//     }
// });

// wit_client.message(args.join(" ") , {})
// .then((data) => {

// })
// .catch(console.error);
// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"

client.login(token)
