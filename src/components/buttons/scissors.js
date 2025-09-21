module.exports = {
    data: {
        name: `scissors`
    },
    async execute(interaction, client) {
        console.log(console.log(`${interaction.user.id} chose scissors`));
    }
}