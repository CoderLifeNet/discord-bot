import { Collection, Events, REST, Routes } from 'discord.js';
import CustomClient from '../../base/classes/CustomClient';
import Event from '../../base/classes/Event';
import Command from '../../base/classes/Command';

export default class ReadyEvent extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: Events.ClientReady,
            description: 'This event is triggered when the client is ready',
            once: true,
        });
    }

    async Execute() {
        console.log(`Logged in as ${this.client.user?.tag}`);

        const clientId = this.client.config.clientId;
        const guildId = this.client.config.guildId;
        const rest = new REST().setToken(this.client.config.token);

        if (!this.client.devMode) {
            const globalCommands: any = await rest.put(
                Routes.applicationCommands(clientId),
                {
                    body: this.GetJSON(
                        this.client.commands.filter((command) => !command.dev)
                    ),
                }
            );

            console.log(
                `Successfully set global commands: ${globalCommands.length}`
            );
        }

        const guildCommands: any = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            {
                body: this.GetJSON(
                    this.client.commands.filter((command) => command.dev)
                ),
            }
        );

        console.log(`Successfully set guild commands: ${guildCommands.length}`);
    }

    private GetJSON(commands: Collection<string, Command>): object[] {
        const data: object[] = [];

        commands.forEach((command) => {
            data.push({
                name: command.name,
                description: command.description,
                options: command.options,
                default_member_permissions:
                    command.default_member_permissions.toString(),
                dm_permission: command.dm_permission,
            });
        });

        return data;
    }
}
