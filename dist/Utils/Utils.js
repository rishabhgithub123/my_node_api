"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    constructor() {
        this.MAX_TOKEN_TIME = 6000;
    }
    static generateVerificationToken(size = 5) {
        let digits = '0123456789';
        let otp = '';
        for (let i = 0; i < size; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return parseInt(otp);
    }
}
exports.Utils = Utils;
