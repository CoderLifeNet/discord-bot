import path from 'path';
import IHandler from '../interfaces/IHandler';
import { glob } from 'glob';
import Event from './Event';
import CustomClient from './CustomClient';
import { ClientEvents, Events } from 'discord.js';
import Command from './Command';
import SubCommand from './SubCommand';

export default class Handler implements IHandler {
    client: CustomClient;

    constructor(client: CustomClient) {
        this.client = client;
    }

    async LoadEvents() {
        const files = (await glob(`dist/events/**/*.js`)).map(
            (filePath: string) => path.resolve(filePath)
        );

        files.map(async (file: string) => {
            const EventFile = await import(file);
            const event = new EventFile.default(this.client) as Event;

            if (!event.name) {
                return (
                    delete require.cache[require.resolve(file)] &&
                    console.log(
                        `Event ${file.split('/').pop()} is missing a name`
                    )
                );
            }

            const execute = (...args: any) => event.Execute(...args);

            if (event.once) {
                this.client.once(event.name as keyof ClientEvents, execute);
            } else {
                this.client.on(event.name as keyof ClientEvents, execute);
            }

            return (
                delete require.cache[require.resolve(file)] &&
                console.log(`Event ${event.name} loaded`)
            );
        });
    }

    async LoadCommands() {
        const files = (await glob(`dist/commands/**/*.js`)).map(
            (filePath: string) => path.resolve(filePath)
        );

        files.map(async (file: string) => {
            const CommandFile = await import(file);
            const command: Command | SubCommand = new CommandFile.default(
                this.client
            ) as Event;

            if (!command.name) {
                return (
                    delete require.cache[require.resolve(file)] &&
                    console.log(
                        `Command ${file.split('/').pop()} is missing a name`
                    )
                );
            }

            if (file.split('/').pop()?.split('.')[2]) {
                return this.client.subCommands.set(
                    command.name,
                    command as SubCommand
                );
            }

            this.client.commands.set(command.name, command as Command);

            return delete require.cache[require.resolve(file)];
        });
    }
}
