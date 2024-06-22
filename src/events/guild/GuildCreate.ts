import { Colors, EmbedBuilder, Events, Guild } from 'discord.js';
import CustomClient from '../../base/classes/CustomClient';
import Event from '../../base/classes/Event';
import GuildConfig from '../../base/database/schemas/GuildConfig';

export default class GuildCreate extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.GuildCreate,
            description: 'Fires when a guild is joined.',
            once: false,
        });
    }

    async Execute(guild: Guild) {
        try {
            if (!(await GuildConfig.exists({ guildId: guild.id }))) {
                await GuildConfig.create({ guildId: guild.id });
            }
        } catch (error) {
            console.log(error);
        }

        const owner = await guild.fetchOwner();
        if (!owner) return;

        const ThanksEmbed = new EmbedBuilder();
        ThanksEmbed.setTitle("I'm here!");
        ThanksEmbed.setDescription(
            'Thanks for adding me to your server! I am a bot that can help you with many things! If you need help, just type `/help`!'
        );
        ThanksEmbed.setColor(Colors.Green);

        owner.send({ embeds: [ThanksEmbed] }).catch(() => {
            console.log('Could not send a DM to the owner of the guild.');
        });
    }
}
