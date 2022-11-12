const { Message, Client, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "messageDelete",
    /**
     *
     * @param {Message} msg
     * @param {Client} client
     */
    async execute(msg, client) {
        const ch = await (
            await client.guilds.fetch("YOUR GUILD")
        ).channels.fetch("YOUR CHANNEL LOG");

        const imgs = [...msg.attachments.values()]
            .filter((att) => att.contentType.startsWith("image"))
            .map((att, index) => {
                att.index = index;
                return att;
            });
        let embeds = [];

        for (const image of imgs) {
            embeds.push(
                new EmbedBuilder()
                    .setColor("Red")
                    .setAuthor({
                        name: `${msg.author.tag}`,
                        iconURL: msg.author.displayAvatarURL({ dynamic: true }),
                    })
                    .setDescription(
                        `Imagen: ${image.index + 1} de ${
                            imgs.length
                        } enviados en ${msg.channel}`
                    )
                    .setImage(image.url)
                    .setFooter({
                        text: `${msg.author.id}`,
                    })
                    .setTimestamp()
            );
        }
        ch.send({ embeds: embeds });
    },
};
