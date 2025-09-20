const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("coinflip")
        .setDescription('Flip a coin!')
        .addStringOption((option) => option
            .setName('heads')
            .setDescription('heads')
            .setRequired(true)
        )
        .addStringOption((option2) => option2
            .setName('tails')
            .setDescription('tails')
            .setRequired(true)
        ),

    async execute(interaction, client) {
        const heads = interaction.options.getString('heads');
        const tails = interaction.options.getString('tails');

        const now = new Date();
        const timestamp = now.getTime();

        console.log(timestamp);

        const prng = timestamp * 273 - 244 + 1802;
        console.log(prng);
        if (prng % 2 == 0){
            await interaction.reply({
                content: `Heads!!! ${heads} was chosen :D`
            });
        }
        else {
            await interaction.reply({
                content: `Tails!!! ${tails} was chosen :D`
            });
        }
    }
};