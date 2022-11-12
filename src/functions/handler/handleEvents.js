const fs = require('node:fs');
const path = require('node:path');
require('colors');

module.exports = (client) => {

    client.handleEvents = async function () {
        const eventsPath = path.join(__dirname, '../../events');
        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
        console.log('------------- EVENTS -------------'.brightGreen)
        console.log(eventFiles)
        console.log('----------------------------------'.brightGreen)

        for (const file of eventFiles) {
            const event = require(path.join(eventsPath, file));
            if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
            else client.on(event.name, (...args) => event.execute(...args, client))
        }
    }
}