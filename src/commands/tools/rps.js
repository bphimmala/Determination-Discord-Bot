const { GatewayIntentBits, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rps')
    .setDescription('Play RPS against a friend!')
    .addUserOption((option) => option
        .setName('user')
        .setDescription('user')
        .setRequired(true)
    ),

    async execute(interaction, client) {
        const player1 = interaction.user.id;
        const play2 = interaction.options.getUser('user');
        const player2 = play2.id;

        const userTempData = new Collection();
        userTempData.set('player1', `<@${player1}`);
        userTempData.set('player2', player2);

        const accept_button = new ButtonBuilder()
            .setCustomId('accept')
            .setEmoji({name: "✅"})
            .setStyle(ButtonStyle.Secondary);

        const decline_button = new ButtonBuilder()
            .setCustomId('decline')
            .setEmoji({name: "❌"})
            .setStyle(ButtonStyle.Secondary);

        const acc_dec_buttons = new ActionRowBuilder().addComponents(accept_button, decline_button);

        if (player1 == player2) {
            await interaction.reply(`You can't play against yourself, silly!`);
        }
        else if (player2 == client.user.id){
            await interaction.reply(`You can't play against the bot, silly!`);
        }
        else {
            const accept_message = await interaction.reply({
                content: `<@${userTempData.get('player2')}>, <@${player1}> wants to play RPS!\nDo you accept?`,
                components: [acc_dec_buttons]
            });

            const challengeFilter = (interaction) => {
                return interaction.user.id === player2;
            };

            const collector = accept_message.createMessageComponentCollector({ challengeFilter, time: 20_000, max: 1 });

            collector.on('collect', async (buttonInteraction) => {
                await buttonInteraction.deferUpdate();

                if(buttonInteraction.user.id === player2) {
                    if (buttonInteraction.customId === 'decline') {
                        await interaction.followUp(`Sorry, <@${player1}>, <@${player2}> declined RPS!`);
                    }
                    else {
                        const rps_embed = new EmbedBuilder()
                            .setTitle(`Rock, Paper, Scissors!`)
                            .setDescription(`<@${player1}> vs <@${player2}>`)
                            .setColor(0x82799c)
                            // .setImage(client.user.displayAvatarURL())
                            .setTimestamp(Date.now())
                            .addFields([
                                {
                                    name: `${interaction.user.username}`,
                                    value: `⚫⚫`,
                                    inline: true
                                },
                                {
                                    name: `${play2.username}`,
                                    value: `⚫⚫`,
                                    inline: true
                                },
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

                        const move_message = await interaction.followUp({
                            embeds: [rps_embed],
                            components: [rps_buttons],
                        });

                        const move_filter = (interaction) => {
                            return ((interaction.user.id === (player1 || player2)) && (interaction.customId === 'rock' || interaction.customId === 'paper' || interaction.customId === 'scissors'));
                        }
                        
                        const move_collector = move_message.createMessageComponentCollector({
                            move_filter, time: 30_000, max: 2
                        });
                        
                        const correctUsers = [player1, player2];
                        const playersClicked = new Map();
                        
                        move_collector.on('collect', async (moveInteraction) => {
                            if(!playersClicked.has(moveInteraction.user.id) && correctUsers.includes(moveInteraction.user.id)) {
                                playersClicked.set(`${moveInteraction.user.id}`, moveInteraction.customId);
                                await moveInteraction.deferUpdate();
                                console.log(playersClicked);
                            }

                            if (playersClicked.size === 2) {
                                const p1_move = playersClicked.get(player1);
                                const p2_move = playersClicked.get(player2);

                                let score = 0; // score < 0 = player 1 wins ; score > 0 = player 2 wins
                                if (p1_move === "rock" && p2_move === "scissors") {
                                    score--;
                                }
                                else if (p1_move === "rock" && p2_move === "paper") {
                                    score++;
                                }
                                else if (p1_move === "paper" && p2_move === "rock") {
                                    score--;
                                }
                                else if (p1_move === "paper" && p2_move === "scissors") {
                                    score++;
                                }
                                else if (p1_move === "scissors" && p2_move === "paper") {
                                    score--;
                                }
                                else if (p1_move === "scissors" && p2_move === "rock") {
                                    score++;
                                }
                                else {
                                    score += 0;
                                }

                                if(score === -1) {
                                    await interaction.followUp(`<@${player1}> wins!`);
                                }
                                else if (score === 1) {
                                    await interaction.followUp(`<@${player2}> wins!`);
                                }
                                else {
                                    await interaction.followUp("You both chose the same thing... #EveryoneIsALoser");
                                }

                                move_collector.stop();
                            }
                        });

                    }
                }
            });
        }

    }
}