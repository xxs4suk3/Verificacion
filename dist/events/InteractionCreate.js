"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = require("..");
exports.default = {
    name: "interactionCreate",
    callback: async (interaction) => {
        switch (interaction.type) {
            case discord_js_1.InteractionType.ApplicationCommand:
                __1.sharedClient.commands
                    .get(interaction.commandName)
                    ?.callback(interaction);
            case discord_js_1.InteractionType.MessageComponent:
                __1.sharedClient.buttons
                    .get(interaction.customId)
                    ?.callback(interaction);
            default:
                break;
        }
    },
};
