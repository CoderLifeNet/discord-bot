const { token } = require('./config.json');
const { Client, Collection, IntentsBitField, Options } = require('discord.js');

const client = new Client({
    makeCache: Options.cacheEverything(),
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.commands = new Collection();

const registers = require('./util/registers');
registers.loadEvents(client);
registers.loadCommands(client);

client.login(token);
