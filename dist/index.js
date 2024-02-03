"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allSockets = exports.sharedClient = void 0;
const BotClass_1 = require("./structs/BotClass");
const discord_js_1 = require("discord.js");
require("./server/express");
const sharedClient = new BotClass_1.BotClient(new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildMembers,
    ],
}));
exports.sharedClient = sharedClient;
const allSockets = new Map();
exports.allSockets = allSockets;
