import {
    ChatInputCommandInteraction,
    Collection,
    Colors,
    EmbedBuilder,
    Events,
} from 'discord.js';
import CustomClient from '../../base/classes/CustomClient';
import Event from '../../base/classes/Event';
import Command from '../../base/classes/Command';

export default class CommandHandler extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.InteractionCreate,
            description: 'Handles commands',
            once: false,
        });
    }

    Execute(interaction: ChatInputCommandInteraction) {
        if (!interaction.isChatInputCommand()) return;

        const command: Command = this.client.commands.get(
            interaction.commandName
        )!;

        if (!command) {
            return interaction
                .reply({
                    content: 'Command not found',
                    ephemeral: true,
                })
                .then(() =>
                    this.client.commands.delete(interaction.commandName)
                );
        }

        if (
            command.dev &&
            !this.client.config.owners.includes(interaction.user.id)
        ) {
            const devOnlyEmbed = new EmbedBuilder();
            devOnlyEmbed.setColor(Colors.Red);
            devOnlyEmbed.setDescription(
                `❌ This command is only available to the bot developers.`
            );

            return interaction.reply({
                embeds: [devOnlyEmbed],
                ephemeral: true,
            });
        }

        const { cooldowns } = this.client;
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name)!;
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (
            timestamps.has(interaction.user.id) &&
            now < (timestamps.get(interaction.user.id) || 0) + cooldownAmount
        ) {
            const wait = (
                ((timestamps.get(interaction.user.id) || 0) +
                    cooldownAmount -
                    now) /
                1000
            ).toFixed(1);

            const waitTimpestamp = (
                ((timestamps.get(interaction.user.id) || 0) + cooldownAmount) /
                1000
            ).toFixed(0);

            const waitEmbed = new EmbedBuilder();
            waitEmbed.setColor(Colors.Red);
            waitEmbed.setDescription(
                `❌ Please wait before using the \`${command.name}\` command again <t:${waitTimpestamp}:R>`
            );

            return interaction.reply({
                embeds: [waitEmbed],
                ephemeral: true,
            });
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(
            () => timestamps.delete(interaction.user.id),
            cooldownAmount
        );

        try {
            const subCommandGroup =
                interaction.options.getSubcommandGroup(false);
            const subCommand = `${interaction.commandName}${
                subCommandGroup ? `.${subCommandGroup}` : ''
            }.${interaction.options.getSubcommand(false) || ''}`;

            return (
                this.client.subCommands.get(subCommand)?.Execute(interaction) ||
                command.Execute(interaction)
            );
        } catch (error) {
            console.error(error);
            interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });
        }
    }
}
