const { GatewayIntentBits, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection } = require('discord.js')
import { rps_score } from /functions/logic/rps_logic.js


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

                    let collectedBothMoves = false;
                    let win = false;
                    const score = {p1: 0, p2: 0};
                    let rounds = 0;
                    while(!collectedBothMoves && !win) {
                        collectedBothMoves = false;

                        const p1_move_message = await interaction.followUp({
                            embeds: [rps_embed],
                            components: [rps_buttons],
                            ephemeral: true,
                        });

                        const p2_move_message = await buttonInteraction.followUp({
                            embeds: [rps_embed],
                            components: [rps_buttons],
                            ephemeral: true,
                        });

                        const move_filter = (interaction) => {
                            return (interaction.customId === 'rock' || interaction.customId === 'paper' || interaction.customId === 'scissors');
                        }
                        
                        const p1_move_collector = p1_move_message.createMessageComponentCollector({
                            move_filter, time: 30_000
                        });

                        const p2_move_collector = p2_move_message.createMessageComponentCollector({
                            move_filter, time: 30_000
                        });

                        const p1_move = { move: "n/a" };
                        const p2_move = { move: "n/a" };

                        p1_move_collector.on('collect', async (moveInteraction) => {
                            await moveInteraction.deferUpdate();
                            
                            if (moveInteraction.customId === 'rock'){
                                p1_move.move = "rock";
                            } else if (moveInteraction.customId === 'paper'){
                                p1_move.move = "paper";
                            } else {
                                p1_move.move = "scissors";
                            }
                        });
                        
                        p2_move_collector.on('collect', async (moveInteraction) => {
                            await moveInteraction.deferUpdate();

                            if (moveInteraction.customId === 'rock'){
                                p2_move.move = "rock";
                            } else if (moveInteraction.customId === 'paper'){
                                p2_move.move = "paper";
                            } else {
                                p2_move.move = "scissors";
                            }
                        });

                        collectedBothMoves = true;
                        let last_score = score;
                        score = rps_score(p1_move.move, p2_move.move); // negative = p1 winning ; positive = p2 winning

                        if (last_score == score) {
                            win = false;
                        }

                    }
                }
            });
        }

    }
}