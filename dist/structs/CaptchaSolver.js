"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaptchaSolver = void 0;
const node_capmonster_1 = require("node-capmonster");
const config_1 = require("../util/config");
class CaptchaSolver {
    static apiKey = config_1.config.capmonster.key;
    static async solveCaptcha(captchaKey, rqdata) {
        const captchaTask = new node_capmonster_1.HCaptchaTask(this.apiKey);
        captchaTask.userAgent =
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0";
        const captchTaskId = await captchaTask.createTask("https://discord.com/login", captchaKey, false, rqdata);
        const captcha = await captchaTask.joinTaskResult(captchTaskId, 300);
        return captcha.gRecaptchaResponse;
    }
}
exports.CaptchaSolver = CaptchaSolver;
