const { Client, Message, SlashCommandBuilder, Interaction, Partials, EmbedBuilder ,Collection } = require ("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayStatus, VoiceConnectionStatus }= require ('discord.js')
const { token } = require("./config.json");
//const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const { readdirSync } = require('fs');
const Path = require("path");

const client = new Client({
    intents: [
        "Guilds",
        "GuildMembers",
        "GuildModeration",
        "GuildBans",
        "GuildEmojisAndStickers",
        "GuildIntegrations",
        "GuildWebhooks",
        "GuildInvites",
        "GuildVoiceStates",
        "GuildPresences",
        "GuildMessages",
        "GuildMessageReactions",
        "GuildMessageTyping",
        "DirectMessages",
        "DirectMessageReactions",
        "DirectMessageTyping",
        "MessageContent",
        "GuildScheduledEvents",
        "AutoModerationConfiguration",
        "AutoModerationExecution"
    ],
    partials: [
        Partials.User,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.ThreadMember
    ]
});

/** @type {Collection<string,{data: SlashCommandBuilder, exec: (interaction: Interaction) => Promise<void>;}>}  */
const Command = new Collection()
client.login(token)
client.once("ready",async c=>{
    for(const file of readdirSync('./Command')){
        if(!file.endsWith('.js'))continue;
        /** @type {{data: SlashCommandBuilder, exec: (interaction:Interaction)=>Promise<void>}} */
    var slash = require(Path.join(__dirname, 'Command',file));
    console.log('loaded command file:',slash.data.name);
    Command.set(slash.data.name, slash)}
    console.log('bot ',c.user.tag)
})


client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;
    const command = Command.get(interaction.commandName)
    if (!command) return;
    await command.exec(interaction)
});