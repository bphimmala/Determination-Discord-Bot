const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rng")
        .setDescription('Pick between 3-10 options!')
        .addStringOption((option1) => option1
            .setName('option1')
            .setDescription('first choice')
            .setRequired(true)
        )
        .addStringOption((option2) => option2
            .setName('option2')
            .setDescription('second choice')
            .setRequired(true)
        )
        .addStringOption((option3) => option3
            .setName('option3')
            .setDescription('third choice')
            .setRequired(true)
        )
        .addStringOption((option4) => option4
            .setName('option4')
            .setDescription('fourth choice')
            .setRequired(false)
        )
        .addStringOption((option5) => option5
            .setName('option5')
            .setDescription('fifth choice')
            .setRequired(false)
        )
        .addStringOption((option6) => option6
            .setName('option6')
            .setDescription('sixth choice')
            .setRequired(false)
        )
        .addStringOption((option7) => option7
            .setName('option7')
            .setDescription('seventh choice')
            .setRequired(false)
        )
        .addStringOption((option8) => option8
            .setName('option8')
            .setDescription('eighth choice')
            .setRequired(false)
        )
        .addStringOption((option9) => option9
            .setName('option9')
            .setDescription('ninth choice')
            .setRequired(false)
        )
        .addStringOption((option10) => option10
            .setName('option10')
            .setDescription('tenth choice')
            .setRequired(false)
        ),

    async execute(interaction, client) {
        const amt = interaction.options.data.length;
        const array = interaction.options.data;
        
        const now = new Date();
        const timestamp = now.getTime();

        const prng = (timestamp + 1802) * 273 - 244;
        const choice = prng % amt;
        const answer = array[choice].value;

        await interaction.reply({
            content: `${answer} was chosen!`
        });
    }
};