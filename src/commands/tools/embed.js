const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Returns an embedded message!'),

    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle(`This is an EMBED`)
            .setDescription('This is a description')
            .setColor(0x82799c)
            .setImage(client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setAuthor({
                url: `https://x.com/baiponn`,
                iconURL: interaction.user.displayAvatarURL(),
                name: interaction.user.tag
            })
            .setFooter({
                iconURL: client.user.displayAvatarURL(),
                text: client.user.tag
            })
            .setURL(`https://www.instagram.com/baiponnn/`)
            .addFields([
                {
                    name: `field 1`,
                    value: `Field value 1`,
                    inline: true
                },
                {
                    name: `field 2`,
                    value: `Field value 2`,
                    inline: true
                }
            ]);

            await interaction.reply({
                embeds: [embed]
            })
    }
};