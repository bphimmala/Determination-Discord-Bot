const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reactor')
        .setDescription('Returns reactions!'),

    async execute(interaction, client) {
        const message = await interaction.reply({
            content: `React here!`,
            fetchReply: true
        });

        // looks through ALL servers that the bot is in !
        const emoji = client.emojis.cache.find(
            emoji => emoji.id == '1402186794815979631'
        );

        // looks through 1..? server and finds the emoji??
        // const emoji = client.guilds.emojis.cache.find(
        //     emoji => emoji.id = '1402186794815979631'
        // );

        message.react(emoji);

        message.react('🦋');

        const filter = (reaction, user) => {
            return reaction.emoji.name == '🦋' && user.id == interaction.user.id
        };

        const collector = message.createReactionCollector({ filter, time: 15000 });

        collector.on("collect", (reaction, user) => {
            console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        });

        collector.on("end", (collected) => {
            console.log(`Collected ${collected.size} items`);
        });
    },
};