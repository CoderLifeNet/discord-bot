import {
    ApplicationCommandOptionType,
    CacheType,
    ChatInputCommandInteraction,
    Colors,
    EmbedBuilder,
    Events,
    Guild,
    PermissionsBitField,
} from 'discord.js';
import Command from '../../base/classes/Command';
import CustomClient from '../../base/classes/CustomClient';
import Category from '../../base/enums/Category';

export default class Emit extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'emit',
            description: 'Emit an event.',
            dev: true,
            category: Category.Developer,
            cooldown: 1,
            default_member_permissions: PermissionsBitField.Flags.Administrator,
            dm_permission: false,
            options: [
                {
                    name: 'event',
                    description: 'the event to emit',
                    required: true,
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        { name: 'GuildCreate', value: Events.GuildCreate },
                        { name: 'GuildDelete', value: Events.GuildDelete },
                    ],
                },
            ],
        });
    }

    Execute(interaction: ChatInputCommandInteraction) {
        const event = interaction.options.getString('event');
        if (!event) return;

        if (event === Events.GuildCreate || event === Events.GuildDelete) {
            this.client.emit(event, interaction.guild as Guild);
        }

        const responseEmbed = new EmbedBuilder();
        responseEmbed.setTitle('Event Emitted');
        responseEmbed.setDescription(`Event \`${event}\` emitted.`);
        responseEmbed.setColor(Colors.DarkVividPink);

        return interaction.reply({ embeds: [responseEmbed], ephemeral: true });
    }
}
