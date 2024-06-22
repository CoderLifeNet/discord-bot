import dotenv from 'dotenv';
import IConfig from './base/interfaces/IConfig';
dotenv.config();

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID, OWNERS } = process.env;

if (!DISCORD_TOKEN) throw new Error('No DISCORD_TOKEN provided.');
if (!CLIENT_ID) throw new Error('No CLIENT_ID provided.');
if (!GUILD_ID) throw new Error('No GUILD_ID provided.');
if (!OWNERS) throw new Error('No OWNERS provided.');

const config: IConfig = {
    token: DISCORD_TOKEN,
    clientId: CLIENT_ID,
    guildId: GUILD_ID,
    owners: OWNERS.split(','),
};

export default config;
