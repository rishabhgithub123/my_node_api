"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true, default: false },
    verification_token: { type: Number, required: true },
    verification_token_time: { type: Date, required: true },
    username: { type: String, required: true },
    created_at: { type: Date, required: true, default: new Date() },
    modified_at: { type: Date, required: true, default: new Date() }
});
exports.default = mongoose_1.model('users', userSchema);
