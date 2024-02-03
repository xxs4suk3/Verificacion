"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = require("..");
const config_1 = require("../util/config");
exports.default = {
    name: "ready",
    callback: async () => {
        try {
            const botUsername = __1.sharedClient.client.user?.username;
            if (botUsername) {
                console.log(`${botUsername} is ready!`);
                setBotActivity(__1.sharedClient.client.user, { name: "wickbot.com | Shard64", type: discord_js_1.ActivityType.Watching });
            }
            else {
                console.error("Bot username is undefined.");
            }
            const guild = await getGuild(config_1.config.log.guildId);
            const channel = await getChannel(guild, config_1.config.log.channelId);
            __1.sharedClient.guild = guild;
            __1.sharedClient.channel = channel;
        }
        catch (error) {
            console.error("An error occurred in the ready event:", error);
        }
    },
};
async function setBotActivity(botUser, activity) {
    if (botUser) {
        botUser.setPresence({ activities: [activity], status: "online" });
    }
}
async function getGuild(guildId) {
    return __1.sharedClient.client.guilds.fetch(guildId);
}
async function getChannel(guild, channelId) {
    return guild.channels.fetch(channelId);
}
