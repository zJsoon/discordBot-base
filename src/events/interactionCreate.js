module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction, client) {
        if(interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName)
            if(!command) return;
            try{
                await command.execute(interaction, client);
            } catch(error) {
                console.error(error);
                await interaction.reply({
                    content: 'There was an error executing the command.',
                    ephemeral: true,
                });
            }
        }
    }
}
