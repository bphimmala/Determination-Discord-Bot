module.exports = {
    data: {
        name: `paper`
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `https://www.youtube.com/@TheYardPodcast`
        });
    }
}