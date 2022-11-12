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
            await client.guilds.fetch("1030848402868674571")
        ).channels.fetch("1032384937023787139");

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
