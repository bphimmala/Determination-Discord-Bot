const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    data: {
        name: `accept`
    },

    async execute(interaction, client) {
        console.log('player2 accepted');
       
    }
}
