const { Message, SlashCommandBuilder, Interaction } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayStatus, VoiceConnectionStatus }= require ('@discordjs/voice');

module.exports={
    data:new SlashCommandBuilder()
    .setName("加入語音頻道")
    .setDescription("讓機器人進入語音頻道"),

    /** @param {Interaction} interaction */
    exec: async function(interaction){
        
    }
}