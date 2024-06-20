const { readdirSync } = require('fs');
const { join } = require('path');

const eventsDir = join(__dirname, '..', 'events');
const commandsDir = join(__dirname, '..', 'commands');

exports.loadEvents = (client) => {
    const eventFiles = readdirSync(eventsDir).filter((file) =>
        file.endsWith('.js')
    );

    for (const file of eventFiles) {
        const event = require(join(eventsDir, file));
        const eventName = file.split('.')[0];

        client.on(eventName, event.bind(null, client));

        console.log(`[Event loaded] ${eventName}`);
    }
};

exports.loadCommands = (client) => {
    const commandFiles = readdirSync(commandsDir).filter((file) =>
        file.endsWith('.js')
    );

    for (const file of commandFiles) {
        const command = require(join(commandsDir, file));
        const commandName = file.split('.')[0];

        client.commands.set(command.info.name, command);

        console.log(`[Command loaded] ${commandName}`);
    }
};
