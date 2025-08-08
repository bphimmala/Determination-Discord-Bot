const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('menu')
        .setDescription('Return a select menu!'),

    async execute(interaction, client) {
        const menu = new StringSelectMenuBuilder()
            .setCustomId(`sub-menu`)
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel(`Option #1`)
                    .setValue(`https://www.youtube.com/@TheYardPodcast`),
                new StringSelectMenuOptionBuilder()
                    .setLabel(`Option #2`)
                    .setValue(`https://www.youtube.com/@AlveusSanctuaryHighlights`)
            );

        const row = new ActionRowBuilder().addComponents(menu);

        await interaction.reply({
            components: [row],
        });
    },
};