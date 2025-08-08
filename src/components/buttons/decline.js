module.exports = {
    data: {
        name: `decline`
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `https://www.youtube.com/@TheYardPodcast`
        });
    }
}