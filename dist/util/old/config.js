"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.saveRoleConfig = void 0;
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const CONFIG_PATH = path_1.default.resolve(__dirname, "..", "config.json");
let config;
exports.config = config;
try {
    exports.config = config = require(CONFIG_PATH);
}
catch {
    exports.config = config = {
        name: process.env.NAME || "",
        token: process.env.TOKEN || "",
        clientId: process.env.CLIENT_ID || "",
        colour: process.env.COLOUR || "",
        port: process.env.PORT || "",
        log: {
            guildId: process.env.GUILD_ID || "",
            channelId: process.env.CHANNEL_ID || "",
        },
        roles: {},
        capmonster: {
            key: process.env.CAPMONSTER_APIKEY || "",
        },
    };
}
const saveRoleConfig = (roles) => {
    const fs = require("fs");
    config.roles = roles;
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
};
exports.saveRoleConfig = saveRoleConfig;
