module.exports = (client, interaction) => {
    if (!interaction.isCommand()) return;

    const cmd = client.commands.get(interaction.commandName.toLowerCase());
    if (!cmd) return;

    if (cmd.permissions.guildOnly && !interaction.guildId) {
        return interaction.reply({
            content: 'This command is only available in servers.',
            ephemeral: true,
        });
    }

    if (cmd.permissions.dmOnly && interaction.guildId) {
        return interaction.reply({
            content: 'This command is only available in DMs.',
            ephemeral: true,
        });
    }

    if (
        cmd.permissions.ids.users.length &&
        !cmd.permissions.ids.users.includes(interaction.user.id)
    ) {
        return interaction.reply({
            content: 'You do not have permission to use this command.',
            ephemeral: true,
        });
    }

    if (interaction.guildId) {
        if (
            cmd.permissions.ids.roles.length &&
            !interaction.member.roles.cache.some(
                (role) => cmd.permissions.ids.roles.includes(role.id) // TODO: May not work, use has instead of some
            )
        ) {
            return interaction.reply({
                content: 'You do not have permission to use this command.',
                ephemeral: true,
            });
        }

        if (
            cmd.permissions.client.length &&
            !interaction.guild.me.permissions.has(cmd.permissions.client)
        ) {
            return interaction.reply({
                content: 'This command is not available in this server.',
                ephemeral: true,
            });
        }

        if (
            cmd.permissions.user.length &&
            !interaction.member.permissions.has(cmd.permissions.user)
        ) {
            return interaction.reply({
                content: 'You do not have permission to use this command.',
                ephemeral: true,
            });
        }

        if (cmd.info.nsfw && !interaction.channel.nsfw) {
            return interaction.reply({
                content: 'This command is only available in NSFW channels.',
                ephemeral: true,
            });
        }

        cmd.run(client, interaction);
    }
};
