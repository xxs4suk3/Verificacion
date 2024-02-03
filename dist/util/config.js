"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.saveRoleConfig = void 0;
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const CONFIG_PATH = path_1.default.resolve(__dirname, "..", "config.json");
const defaultConfig = {
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
let config;
exports.config = config;
try {
    exports.config = config = JSON.parse(fs_1.default.readFileSync(CONFIG_PATH, "utf8"));
}
catch (error) {
    exports.config = config = defaultConfig;
}
const saveRoleConfig = (roles) => {
    config.roles = roles;
    fs_1.default.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
};
exports.saveRoleConfig = saveRoleConfig;
