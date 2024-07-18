const { Message, SlashCommandBuilder, Interaction } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("ping"),
        /** @param {Interaction} interaction */
    exec: async function (interaction) {
        await interaction.reply({ content: 'pong!' });
    }
}