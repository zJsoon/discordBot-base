require('dotenv').config();
require('colors');
const fs = require('node:fs');

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { title } = require('node:process');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

client.commands = new Collection();
client.events = new Collection();

const functionFolders = fs.readdirSync(`${__dirname}/functions`)
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`${__dirname}/functions/${folder}`)
        .filter((file) => file.endsWith('.js'))
    for (const file of functionFiles)
        require(`${__dirname}/functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();

client.login(process.env.token).catch(() => console.log(`-[X]-YOU HAVE NOT SPECIFIED A VALID TOKEN OR YOU ARE FAILING ATTEMPTS -[X]-[-] ENABLE ATTEMPTS ON https://discord.dev [-]`.red))
