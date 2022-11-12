require('colors');
const { ActivityType } = require("discord.js");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`-------------- BOT INFO --------------`.brightBlue);
        console.log(`  - [Conectado como]: ${client.user.tag}`.brightBlue);
        console.log(
            `  - [CLIENT]: ${client.guilds.cache.size} servers`.brightBlue
        );
        console.log(
            `  - [CLIENT]: ${client.guilds.cache.reduce(
                (a, b) => a + b.memberCount,
                0
            )} users`.brightBlue
        );
        console.log(`--------------------------------------`.brightBlue);
        let index = 0;
        function setNextStatus() {
            const activityOptions = [
                {
                    type: ActivityType.Watching,
                    name: `/help | Demons Community`,
                },
                {
                    type: ActivityType.Watching,
                    name: `/help | ${client.guilds.cache.reduce((a,b) => a+b.memberCount, 0)} users`,
                },
            ];
    
            if(index > ((activityOptions.length)-1)){index = 0}
            const status = activityOptions[index]
            client.user.setPresence({ activities: [{ name: status.name, type: status.type}], status: "dnd"})
            index++
        }
        setNextStatus();
        setInterval(setNextStatus, 15000)
    },
};
