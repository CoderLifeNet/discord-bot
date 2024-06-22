import { Events, Guild } from 'discord.js';
import CustomClient from '../../base/classes/CustomClient';
import Event from '../../base/classes/Event';
import GuildConfig from '../../base/database/schemas/GuildConfig';

export default class GuildDelete extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.GuildDelete,
            description: 'Fires when a guild is deleted.',
            once: false,
        });
    }

    async Execute(guild: Guild) {
        try {
            await GuildConfig.deleteOne({ guildId: guild.id });
        } catch (error) {
            console.log(error);
        }
    }
}
