module.exports = {
    data: {
        name: `scissors`
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `https://www.youtube.com/@TheYardPodcast`
        });
    }
}