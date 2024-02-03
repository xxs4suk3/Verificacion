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
const discord_js_1 = require("discord.js");
const builders_1 = require("@discordjs/builders");
const embeds = __importStar(require("../util/embeds"));
const config_json_1 = require("../config.json");
exports.default = {
    name: "spawn",
    data: new discord_js_1.SlashCommandBuilder()
        .setName("spawn")
        .setDescription("Generate the verification message!"),
    async callback(interaction) {
        function isOwner(ownerId) {
            if (typeof ownerId === "number") {
                ownerId = ownerId.toString();
            }
            return config_json_1.ownerIDS.includes(ownerId);
        }
        const userId = interaction.user.id;
        if (!isOwner(userId)) {
            return interaction.reply({
                ephemeral: true,
                embeds: [await embeds.lackPermissionsEmebd()],
            });
        }
        /* if (
          !(
            interaction.member?.permissions as Readonly<PermissionsBitField>
          ).has(PermissionsBitField.Flags.ManageGuild)
        ) {
          return interaction.reply({
            ephemeral: true,
            embeds: [await embeds.lackPermissionsEmebd()],
          });
        } */
        const actionRow = new builders_1.ActionRowBuilder().addComponents(new builders_1.ButtonBuilder()
            .setLabel("Verify Here")
            .setStyle(discord_js_1.ButtonStyle.Success)
            .setCustomId("verify"), new builders_1.ButtonBuilder()
            .setLabel("Help")
            .setStyle(discord_js_1.ButtonStyle.Secondary)
            .setCustomId("help"));
        interaction.reply({
            ephemeral: true,
            content: "Spawned verify message.",
        });
        interaction.channel?.send({
            embeds: [await embeds.verifyMessageEmbed()],
            components: [actionRow],
        });
    },
};
