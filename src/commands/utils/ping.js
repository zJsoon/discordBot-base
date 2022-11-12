const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('I give u my ping!'),
    
    async execute(interaction, client) {
        await interaction.reply(`El ping del bot es de \`${client.ws.ping}ms\``)
    }
}