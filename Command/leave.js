const { SlashCommandBuilder , Interaction} = require("discord.js");
const { getVoiceConnection } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('離開')
        .setDescription('讓我離開你的語音房'),
        /** @param {Interaction} interaction */
        exec: async function (interaction) {
        const connection = getVoiceConnection(interaction.guild.id);
        if (!connection) {
            return interaction.reply('我不在語音房你要怎麼讓我離開');
        }

        connection.destroy();
        return interaction.reply('我出來了!');
    },
};
