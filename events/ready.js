module.exports = (client) => {
    client.commands.map(async (command) => {
        if (command.register.commandIds.length) return;

        const commandInfo = {
            name: command.info.name,
            description: command.info.description,
            options: command.info.options,
        };

        const cmd = command.register.testGuild
            ? await client.guilds.cache
                  .get(command.register.testGuild)
                  .commands.create(commandInfo)
                  .catch(() => null)
            : await client.application.commands
                  .create(commandInfo)
                  .catch(() => null);

        console.log(
            `[Command loaded] ${command.info.name} ${
                cmd
                    ? cmd.guildId
                        ? `registered in guild with id ${cmd.id}`
                        : `registered globally with id ${cmd.id}`
                    : 'failed to register'
            }`
        );
    });

    return console.log(`[Ready] Logged in as ${client.user.tag}`);
};
