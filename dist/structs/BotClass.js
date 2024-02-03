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
exports.BotClient = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const path_1 = require("path");
const config_1 = require("../util/config");
class BotClient {
    client;
    events = new discord_js_1.Collection();
    emojis = new discord_js_1.Collection();
    commands = new discord_js_1.Collection();
    buttons = new discord_js_1.Collection();
    guild = null;
    channel = null;
    constructor(client) {
        this.client = client;
        console.log(config_1.config);
        this.client.login(config_1.config.token);
        this.registerEvents();
        this.registerCommands();
        this.registerButtons();
        this.registerAntiCrash();
    }
    async registerEvents() {
        var _a;
        const eventFiles = (0, fs_1.readdirSync)((0, path_1.join)(__dirname, "..", "events"));
        for (const file of eventFiles) {
            const event = await (_a = `../events/${file}`, Promise.resolve().then(() => __importStar(require(_a))));
            this.events.set(event.default.name, event.default);
        }
        this.events.forEach((event) => {
            this.client.on(event.name, event.callback);
        });
    }
    async registerCommands() {
        var _a;
        const commandFiles = (0, fs_1.readdirSync)((0, path_1.join)(__dirname, "..", "commands"));
        for (const file of commandFiles) {
            const command = await (_a = `../commands/${file}`, Promise.resolve().then(() => __importStar(require(_a))));
            this.commands.set(command.default.name, command.default);
        }
        const rest = new discord_js_1.REST({ version: "10" }).setToken(config_1.config.token);
        await rest.put(discord_js_1.Routes.applicationCommands(config_1.config.clientId), {
            body: this.commands.map((command) => command.data.toJSON()),
        });
    }
    async registerButtons() {
        var _a;
        const buttonFiles = (0, fs_1.readdirSync)((0, path_1.join)(__dirname, "..", "buttons"));
        for (const file of buttonFiles) {
            const button = await (_a = `../buttons/${file}`, Promise.resolve().then(() => __importStar(require(_a))));
            this.buttons.set(button.default.id, button.default);
        }
    }
    async registerAntiCrash() {
        process.on('unhandledRejection', (reason, p) => {
            console.log('\n\n\n\n\n\n [antiCrash] :: Unhandled Rejection/Catch');
            console.log('Reason: ', reason.stack ? String(reason.stack) : String(reason), p);
            console.log(' [antiCrash] :: Unhandled Rejection/Catch \n\n\n\n\n\n');
        });
        process.on("uncaughtException", (err, origin) => {
            console.log('\n\n\n\n\n\n [antiCrash] :: Uncaught Exception/Catch');
            console.log('Exception: ', err.stack ? err.stack : err, origin);
            console.log(' [antiCrash] :: Uncaught Exception/Catch \n\n\n\n\n\n');
        });
        process.on('uncaughtExceptionMonitor', (err, origin) => {
            console.log('\n\n\n\n\n\n [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
            console.log(err.stack ? err.stack : err, origin);
            console.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR) \n\n\n\n\n\n');
        });
    }
}
exports.BotClient = BotClient;
