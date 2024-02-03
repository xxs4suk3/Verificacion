"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const SocketClass_1 = require("../structs/SocketClass");
const __1 = require("..");
const embeds = __importStar(require("../util/embeds"));
exports.default = {
    id: "verify",
    async callback(interaction) {
        const user = await __1.sharedClient.client.guilds.cache
            .get(interaction.guildId)
            ?.members.fetch(interaction.user.id);
        await interaction.deferReply({
            ephemeral: true,
        });
        const channel = await user.createDM();
        const messageEmbed = await embeds.prepareVerificationEmbed();
        const failedEmbed = await embeds.failedToMessageEmbed();
        const verifyEmbed = await embeds.afterButtonPressEmbed(channel.id);
        if (__1.allSockets.has(user.id))
            return interaction.editReply({
                embeds: [await embeds.alreadyVerifyingEmbed()],
            });
        const messagedUser = await channel
            .send({ embeds: [messageEmbed] })
            .catch(() => false);
        if (!messagedUser)
            return interaction.editReply({
                embeds: [failedEmbed],
            });
        await interaction.editReply({
            embeds: [verifyEmbed],
        });
        const socketClass = new SocketClass_1.DiscordSocket(user);
        __1.allSockets.set(user.id, socketClass);
    },
};
