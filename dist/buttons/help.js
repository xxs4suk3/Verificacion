"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: "help",
    async callback(interaction) {
        await interaction.reply({
            ephemeral: true,
            content: "https://wickbot.com/support",
        });
    },
};
