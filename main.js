//const Discord = require('discord.js')
//const client = new Discord.Client()
const PORT = process.env.PORT || 5000
const sqlite = require('sqlite');
const commando = require('discord.js-commando')
const { prefix, token } = require('./get_config');

const client = new commando.Client({
    owner: '305722491471659011',
    commandPrefix: prefix
});

//https://discordapp.com/oauth2/authorize?client_id=577326542758215687&scope=bot


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

client.login(token)
