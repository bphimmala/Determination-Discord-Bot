require('dotenv').config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const { Guilds, GuildMessages } = GatewayIntentBits;
const client = new Client({ intents: [Guilds, GuildMessages] /*32767*/ });
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.userTempData = new Collection();
client.commandArray = [];
// client.colour = "";


const functionFolders = fs.readdirSync(`./src/functions`)       // get folders from src/functions
for (const folder of functionFolders) {
    const functionFiles = fs                                    // get JavaScript files of functions folder
        .readdirSync(`./src/functions/${folder}`)
        .filter(file => file.endsWith(".js"));

    for (const file of functionFiles)                           // for each file, pass in client to that file
        require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);