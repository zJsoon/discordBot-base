const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('I give u my ping!'),
    
    async execute(interaction, client) {
        await interaction.reply(`The bot's ping is from \`${client.ws.ping}ms\``)
    }
}
