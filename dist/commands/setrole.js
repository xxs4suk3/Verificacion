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
const config_1 = require("../util/config");
const embeds = __importStar(require("../util/embeds"));
const config_json_1 = require("../config.json");
exports.default = {
    name: "setrole",
    data: new discord_js_1.SlashCommandBuilder()
        .setName("setrole")
        .setDescription("Set a role for a verified user.")
        .addRoleOption((option) => option
        .setName("role")
        .setDescription("The role to give to the user.")
        .setRequired(true)),
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
           !(interaction.member?.permissions as Readonly<PermissionsBitField>).has(
             PermissionsBitField.Flags.ManageRoles
           )
         ) {
           return interaction.reply({
             ephemeral: true,
             embeds: [await embeds.lackPermissionsEmebd()],
           });
         } */
        const roleOption = interaction.options.get("role");
        if (!roleOption) {
            return interaction.reply({
                ephemeral: true,
                embeds: [await embeds.lackPermissionsEmebd()],
            });
        }
        const role = roleOption.role;
        if (role?.position >=
            (await interaction.guild?.members.fetchMe())?.roles.highest?.position)
            return await interaction.reply({
                ephemeral: true,
                embeds: [await embeds.roleIsAboveMeEmbed()],
            });
        const roles = { ...config_1.config.roles };
        roles[interaction.guildId] = role?.id;
        (0, config_1.saveRoleConfig)(roles);
        await interaction.reply({
            ephemeral: true,
            embeds: [await embeds.setRoleEmbed()],
        });
    },
};
