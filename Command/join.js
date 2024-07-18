const { SlashCommandBuilder, Interaction } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('加入語音房')
        .setDescription('讓機器人進入語音頻道'),

    /** @param {Interaction} interaction */
    exec: async function(interaction) {
        const channel = interaction.member.voice.channel;
        if (!channel) {
            return interaction.reply('你需要在語音頻道我才能加入');
        }
        joinVoiceChannel({
            channelId: channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });
        const nickname = interaction.member.displayName;
        console.log(`進入到${nickname}所在的語音房`);
    }
};
