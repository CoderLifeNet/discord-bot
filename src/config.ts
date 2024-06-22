import dotenv from 'dotenv';
import IConfig from './base/interfaces/IConfig';
dotenv.config();

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID, OWNERS, MONGO_URL } = process.env;

if (!DISCORD_TOKEN) throw new Error('No DISCORD_TOKEN provided.');
if (!CLIENT_ID) throw new Error('No CLIENT_ID provided.');
if (!GUILD_ID) throw new Error('No GUILD_ID provided.');
if (!OWNERS) throw new Error('No OWNERS provided.');
if (!OWNERS) throw new Error('No OWNERS provided.');
if (!MONGO_URL) throw new Error('No MONGO_URL provided.');

const config: IConfig = {
    token: DISCORD_TOKEN,
    clientId: CLIENT_ID,
    guildId: GUILD_ID,
    owners: OWNERS.split(','),
    mongoUrl: MONGO_URL,
};

export default config;
