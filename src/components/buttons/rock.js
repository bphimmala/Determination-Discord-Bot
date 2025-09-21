
module.exports = {
    data: {
        name: `rock`
    },
    async execute(interaction, client) {
        console.log(`${interaction.user.id} chose rock`);
    }
}