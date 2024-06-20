const { testGuild } = require('../config.json');

module.exports = {
    info: {
        name: 'ping',
        description: 'Ping!',
        arguments: [],
        nsfw: false,
    },
    permissions: {
        client: [],
        user: [],
        ids: {
            roles: [],
            users: [],
        },
        dmOnly: false,
        guildOnly: false,
    },
    register: {
        commandIds: [],
        testGuild,
    },
    run: async (client, interaction) => {
        interaction.reply('Pong!');
    },
};
