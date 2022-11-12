const fs = require("node:fs");
const path = require("node:path");
const { Routes } = require("discord.js");
const { REST } = require('@discordjs/rest');
require("dotenv").config();

module.exports = (client) => {
    client.handleCommands = async function () {
        const commandsPath = path.join(__dirname, "../../commands");
        const commandsJSON = [];

        //Read folders of commands folder and their files, if js files, add them to commands
        const commandsFolder = fs.readdirSync(commandsPath);
        for (const folder of commandsFolder) {
            const commandFiles = fs
                .readdirSync(path.join(commandsPath, folder))
                .filter((file) => file.endsWith(".js"));
            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, folder, file);
                const command = require(filePath);

                client.commands.set(command.data.name, command);
                commandsJSON.push(command.data.toJSON());
            }
        }
        //Register commands
        const rest = new REST({ version: "10" }).setToken(process.env.token);
        rest.put(Routes.applicationCommands(process.env.clientID), {
            body: commandsJSON,
        })
            .then((data) =>
                console.log(`------------------- COMMANDS -------------------`.brightMagenta,`\nSuccessfully registered ${data.length} application commands.\n------------------------------------------------`.brightMagenta)
            )
            .catch(console.error);
    };
};