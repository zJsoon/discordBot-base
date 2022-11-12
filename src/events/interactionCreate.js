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
                    content: 'Ha habido un error al ejecutar el comando. | There was an error executing the command.',
                    ephemeral: true,
                });
            }
        }
    }
}