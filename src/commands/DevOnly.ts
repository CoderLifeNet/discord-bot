import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    PermissionsBitField,
} from 'discord.js';
import Command from '../base/classes/Command';
import CustomClient from '../base/classes/CustomClient';
import Category from '../base/enums/Category';

export default class Test extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: 'devonly',
            description: 'dev only command',
            cooldown: 5,
            category: Category.Utilities,
            default_member_permissions:
                PermissionsBitField.Flags.ModerateMembers,
            dm_permission: true,
            options: [],
            dev: true,
        });
    }

    Execute(interaction: ChatInputCommandInteraction) {
        interaction.reply({
            content: 'Dev Only command executed!',
            ephemeral: true,
        });
    }
}
