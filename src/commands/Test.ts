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
            name: 'test',
            description: 'Test command',
            cooldown: 5,
            category: Category.Utilities,
            default_member_permissions:
                PermissionsBitField.Flags.UseApplicationCommands,
            dm_permission: true,
            options: [
                {
                    name: 'one',
                    description: 'option 1',
                    type: ApplicationCommandOptionType.Subcommand,
                },
                {
                    name: 'two',
                    description: 'option 2',
                    type: ApplicationCommandOptionType.Subcommand,
                },
            ],
            dev: false,
        });
    }

    // Execute(interaction: ChatInputCommandInteraction) {
    //     interaction.reply({
    //         content: 'Test command executed!',
    //         ephemeral: true,
    //     });
    // }
}
