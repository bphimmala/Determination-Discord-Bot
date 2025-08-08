
module.exports = {
    data: {
        name: `rock`
    },
    async execute(interaction, client) {

        await interaction.reply({
            content: `https://www.youtube.com/@TheYardPodcast`
        });
    }
}