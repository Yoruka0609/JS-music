const { Client, SlashCommandBuilder, Interaction, Partials, Collection } = require ("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayStatus, VoiceConnectionStatus }= require ('@discordjs/voice')
const { token } = require("./config.json");
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
const SlashCommand = new Collection()
client.login(token)
client.once("ready",async c=>{
    for (const file of readdirSync('./Command')) {
        if (!file.endsWith('.js')) continue;
        /** @type {{data: SlashCommandBuilder, exec: (interaction: Interaction) => Promise<void>;}} */
        var slash = require(Path.join(__dirname, 'Command', file))
        console.log('loaded slash command:',slash.data.name);
        SlashCommand.set(slash.data.name, slash)
    }
    console.log('bot ',c.user.tag)
    c.application.commands.set(SlashCommand.map(x => x.data.toJSON()))
})


client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;
    const command = SlashCommand.get(interaction.commandName)
    if (!command) return;
    await command.exec(interaction)
});