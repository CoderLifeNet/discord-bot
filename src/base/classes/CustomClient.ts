import { Client, Collection, GatewayIntentBits } from 'discord.js';
import ICustomClient from '../interfaces/ICustomClient';
import IConfig from '../interfaces/IConfig';
import config from '../../config';
import Handler from './Handler';
import Command from './Command';
import SubCommand from './SubCommand';
import { connect } from 'mongoose';

export default class CustomClient extends Client implements ICustomClient {
    config: IConfig;
    handler: Handler;
    commands: Collection<string, Command>;
    subCommands: Collection<string, SubCommand>;
    cooldowns: Collection<string, Collection<string, number>>;
    devMode: boolean;

    constructor() {
        super({ intents: [GatewayIntentBits.Guilds] });
        this.config = config;
        this.handler = new Handler(this);
        this.commands = new Collection();
        this.subCommands = new Collection();
        this.cooldowns = new Collection();
        this.devMode = process.argv.slice(2).includes('--dev') ? true : false;
    }

    Init(): void {
        this.LoadHandlers();

        this.login(this.config.token);

        connect(this.config.mongoUrl).then(() => {
            console.log('Connected to MongoDB!');
        });
    }

    LoadHandlers(): void {
        this.handler.LoadEvents();
        this.handler.LoadCommands();
    }
}
