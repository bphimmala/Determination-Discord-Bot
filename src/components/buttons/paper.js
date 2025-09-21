module.exports = {
    data: {
        name: `paper`
    },
    async execute(interaction, client) {
        console.log(console.log(`${interaction.user.id} chose paper`));
    }
}