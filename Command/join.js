const { Message, SlashCommandBuilder, Interaction } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayStatus, VoiceConnectionStatus }= require ("discord.js");

module.exports={
    data:new SlashCommandBuilder()
    .setName("加入語音頻道")
    .setDescription("讓機器人進入語音頻道"),

    /** @param {Interaction} interaction */
    exec: async function(interaction){
        const channel = interaction.menber.voice.channel;
        if(!channel){
            return interaction.reply("你需要在語音頻道我才能加入");
        }
        joinVoiceChannel({
            channelId: channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });
        return interaction.reply('我進來你的語音房了')
    }
}