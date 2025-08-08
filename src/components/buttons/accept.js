const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    data: {
        name: `accept`
    },

    async execute(interaction, client) {
        //const player1 = interaction.user.id;
        //const play2 = interaction.options.getUser('user');
        //const player2 = play2.id;

        const player1 = userTempData.get('player1');
        const player2 = userTempData.get('player2');

        if (player1 == "hello") {
            await interaction.reply(`You can't play against yourself, silly!`);
        }
        else if ("heheahh" == client.user.username){
            await interaction.reply(`You can't play against the bot, silly!`);
        }
        else {
            const rps_embed = new EmbedBuilder()
                .setTitle(`Rock, Paper, Scissors!`)
                .setDescription(`<@${player1}> vs meow}`)
                .setColor(0x82799c)
                .setImage(client.user.displayAvatarURL())
                .setTimestamp(Date.now())
                .addFields([
                    {
                        name: `<@${player1}>`,
                        value: `⚫⚫`,
                        inline: true
                    },
                    {
                        name: `meow`,
                        value: `⚫⚫`,
                        inline: true
                    },
                    // {
                    //     name: '\u200B',
                    //     value: '\u200B'
                    // },
                    // {
                    //     name: `It is ${fighter}'s turn to select!`,
                    //     value: 'Choose your move below.',
                    // }
                ]);

            const rock_button = new ButtonBuilder()
                .setCustomId('rock')
                .setEmoji({name: "🪨"})
                .setStyle(ButtonStyle.Secondary);

            const paper_button = new ButtonBuilder()
                .setCustomId('paper')
                .setEmoji({name: "📄"})
                .setStyle(ButtonStyle.Secondary);

            const scissors_button = new ButtonBuilder()
                .setCustomId('scissors')
                .setEmoji({name: "✂️"})
                .setStyle(ButtonStyle.Secondary);

            const rps_buttons = new ActionRowBuilder().addComponents(rock_button, paper_button, scissors_button);

            await interaction.reply({
                components: [rps_buttons],
                embeds: [rps_embed],
                //ephemeral: true
            })
        }
    }
}
