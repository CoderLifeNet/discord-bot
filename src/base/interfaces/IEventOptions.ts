import { Events } from 'discord.js';

export default interface IEventOptions {
    name: Events;
    once: boolean;
    description: string;
}
