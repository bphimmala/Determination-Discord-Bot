const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')


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

        userTempData.set('player1', {userID: player1});
        userTempData.set('player2', {userID: player2});

        const accept_button = new ButtonBuilder()
            .setCustomId('accept')
            .setEmoji({name: "✅"})
            .setStyle(ButtonStyle.Secondary);

        const decline_button = new ButtonBuilder()
            .setCustomId('decline')
            .setEmoji({name: "❌"})
            .setStyle(ButtonStyle.Secondary);

        const acc_dec_buttons = new ActionRowBuilder().addComponents(accept_button, decline_button);
        await interaction.reply({
            content: `<@${player2}>, <@${player1}> wants to play RPS!\nDo you accept?`,
            components: [acc_dec_buttons]
        });


    }
}


// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('rps')
//         .setDescription('Play RPS against a friend!')
//         .addUserOption((option) => option
//             .setName('user')
//             .setDescription('user')
//             .setRequired(true)
//         ),

//     async execute(interaction, client) {
//         const player1 = interaction.user.id;
//         const play2 = interaction.options.getUser('user');
//         const player2 = play2.id;

//         const challenge_accept_message = await interaction.reply({
//             content: `<@${player2}>, <@${player1}> wants to play RPS!\nDo you accept?`,
//             withResponse: true,
//         });

//         const { message } = challenge_accept_message.resource;

//         message.react('✅').then(() => message.react('❌'));

//         const collectorFilter = (reaction, user) => //{
//             // console.log('wahhh');
//             (reaction.emoji.name === '✅' && user.id === player2);
//         //};

//         const collector = message.createReactionCollector({ collectorFilter, time: 20_000});

//         collector.on("collect", async (reaction, user) => {
//             if (reaction.emoji.name === '✅') {
//                 message.channel.send('RPS');
//             }
//             else {
//                 message.channel.send(`<@${player2}> declined!`);
//             }

//             collector.stop();
//         });

//     }
// };


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('rps')
//         .setDescription('Play RPS against a friend!')
//         .addUserOption((option) => option
//             .setName('user')
//             .setDescription('user')
//             .setRequired(true)
//         ),

//     async execute(interaction, client) {
//         const player1 = interaction.user.id;
//         const play2 = interaction.options.getUser('user');
//         const player2 = play2.id;

//         const challenge_accept_message = await interaction.reply({
//             content: `<@${player2}>, <@${player1}> wants to play RPS!\nDo you accept?`,
//             withResponse: true,
//         });

//         const { message } = challenge_accept_message.resource;

//         message.react('✅').then(() => message.react('❌'));

//         const collectorFilter = (reaction, user) => {
//             console.log('wahhh');
//             return (reaction.emoji.name === '✅' && user.id === player2);
//         };

//         message.awaitReactions({ filter: collectorFilter, max: 1, time: 20_000, errors: ['time'] })
//             .then(collected => {
//                 const reaction = collected.first();
//                 if (reaction.emoji.name === '✅') {
//                     message.channel.send('RPS');
//                 }
//                 else {
//                     message.channel.send(`<@${player2}> declined!`);
//                 }
//             })
//             .catch(collected => {
//                 message.reply(`Request timed out.`);
//             });
//     }
// };

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('rps')
//         .setDescription('Play RPS against a friend!')
//         .addUserOption((option) => option
//             .setName('user')
//             .setDescription('user')
//             .setRequired(true)
//         ),

//     async execute(interaction, client) {
//         const fighter = interaction.user.username;
//         const opp = interaction.options.getUser('user');
//         const opponent = opp.username;

//         if (opponent == fighter) {
//             await interaction.reply(`You can't play against yourself, silly!`);
//         }
//         else if (opponent == client.user.username){
//             await interaction.reply(`You can't play against the bot, silly!`);
//         }
//         else {
//             const rps_embed = new EmbedBuilder()
//                 .setTitle(`Rock, Paper, Scissors!`)
//                 .setDescription(`${fighter} vs ${opponent}`)
//                 .setColor(0x82799c)
//                 .setImage(client.user.displayAvatarURL())
//                 .setTimestamp(Date.now())
//                 .addFields([
//                     {
//                         name: `${fighter}`,
//                         value: `⚫⚫`,
//                         inline: true
//                     },
//                     {
//                         name: `${opponent}`,
//                         value: `⚫⚫`,
//                         inline: true
//                     },
//                     // {
//                     //     name: '\u200B',
//                     //     value: '\u200B'
//                     // },
//                     // {
//                     //     name: `It is ${fighter}'s turn to select!`,
//                     //     value: 'Choose your move below.',
//                     // }
//                 ]);

//             const rock_button = new ButtonBuilder()
//                 .setCustomId('rock')
//                 .setEmoji({name: "🪨"})
//                 .setStyle(ButtonStyle.Secondary);

//             const paper_button = new ButtonBuilder()
//                 .setCustomId('paper')
//                 .setEmoji({name: "📄"})
//                 .setStyle(ButtonStyle.Secondary);

//             const scissors_button = new ButtonBuilder()
//                 .setCustomId('scissors')
//                 .setEmoji({name: "✂️"})
//                 .setStyle(ButtonStyle.Secondary);

//             const rps_buttons = new ActionRowBuilder().addComponents(rock_button, paper_button, scissors_button);

//             await interaction.reply({
//                 components: [rps_buttons],
//                 embeds: [rps_embed],
//                 ephemeral: true
//             })
//         }
//     }
// }


// SEE IF U CAN MAKE THIS EPHEMERAL !!!!!!!!!!!!
// if not,,, learn how to have the bot dm and save the responses to rps !!!
// best of 3 fs!!!!
// embedded message that updates
    // buttons to choose rock paper or scissors that only the bot can tell which was pressed

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName("rps")
//         .setDescription('Play RPS against a friend!')
//         .addUserOption((option) => option.setName('user').setDescription('user').description.setRequired(true)),

//     async execute(interaction, client) {
//         const rock_button = new ButtonBuilder()
//             .setCustomId('rock')
//             .setEmoji({name: "🪨"})
//             .setStyle(ButtonStyle.Secondary);

//         const paper_button = new ButtonBuilder()
//             .setCustomId('paper')
//             .setEmoji({name: "📄"})
//             .setStyle(ButtonStyle.Secondary);

//         const scissors_button = new ButtonBuilder()
//             .setCustomId('scissors')
//             .setEmoji({name: "✂️"})
//             .setStyle(ButtonStyle.Secondary);

//         const rps_buttons = new ActionRowBuilder().addComponents(rock_button, paper_button, scissors_button);
//         await interaction.reply({
//             components: [rps_buttons]
//         });
//     },
// };

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const { SlashCommandBuilder, MessageFlags } = require('discord.js')

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('rps')
//         .setDescription('Play RPS against a friend!'),

//     async execute(interaction, client) {
//         await interaction.reply({
//             content: `Choose your fighter!`,
//             sponse: true,
//             // flags: MessageFlags.Ephemeral,
//         });

//         const message = await interaction.fetchReply();

//         message.react('🪨');
//         message.react('📄');
//         message.react('✂️');

//         const filter = (reaction, user) => {
//             return user.id == interaction.user.id
//         };

//         const collector = message.createReactionCollector({ filter, time: 15000 });

//         collector.on("collect", (reaction, user) => {
//             console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
//         });

//         collector.on("end", (collected) => {
//             console.log(`Collected ${collected.size} items`);
//         });
//     },
// };