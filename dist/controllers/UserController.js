"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const Utils_1 = require("../Utils/Utils");
const NodeMailer_1 = require("../Utils/NodeMailer");
const Jwt = require("jsonwebtoken");
const env_1 = require("../environments/env");
class UserController {
    static signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const username = req.body.username;
            const password = req.body.password;
            const verificationToken = Utils_1.Utils.generateVerificationToken();
            try {
                const hash = yield Utils_1.Utils.encryptPassword(password);
                const data = {
                    email: email,
                    password: hash,
                    username: username,
                    verification_token: verificationToken,
                    verification_token_time: Date.now() + new Utils_1.Utils().MAX_TOKEN_TIME,
                    created_at: new Date(),
                    updated_at: new Date()
                };
                let user = yield new User_1.default(data).save();
                res.send(user);
                yield NodeMailer_1.NodeMailer.sendEmail({
                    to: [email],
                    subject: 'Email Verification',
                    html: '<h1>' + verificationToken + '</h1>',
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static verify(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const verification_token = req.body.verification_token;
            const email = req.user.email;
            try {
                const user = yield User_1.default.findOneAndUpdate({ email: email,
                    verification_token: verification_token,
                    verification_token_time: { $gt: Date.now() }
                }, { verified: true }, { new: true });
                if (user) {
                    res.send(user);
                }
                else {
                    throw new Error('Verification Token is Expired. Please Request for a new One');
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    static resendVerificationEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.user.email;
            const verificationToken = Utils_1.Utils.generateVerificationToken();
            try {
                const user = yield User_1.default.findOneAndUpdate({ email: email }, { verification_token: verificationToken,
                    verification_token_time: Date.now() + new Utils_1.Utils().MAX_TOKEN_TIME
                });
                if (user) {
                    yield NodeMailer_1.NodeMailer.sendEmail({ to: [user.email],
                        subject: 'Email Verification',
                        html: '<h1>' + verificationToken + '</h1>'
                    });
                    res.json({
                        success: true
                    });
                }
                else {
                    throw Error('User Does Not Exist');
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const password = req.query.password;
            try {
                yield Utils_1.Utils.comparePassword({
                    plainPassword: password,
                    encryptPassword: user.password
                });
                const token = Jwt.sign({
                    email: user.email,
                    user_id: user._id,
                }, env_1.getEnvironmentVariables().jwt_secret, { expiresIn: '120d' });
                const data = {
                    user: user,
                    token: token,
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static updatePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.user.user_id;
            const password = req.body.password;
            const confirmPassword = req.body.confirm_password;
            const newPassword = req.body.new_password;
            try {
                User_1.default.findOne({ _id: user_id }).then((user) => __awaiter(this, void 0, void 0, function* () {
                    yield Utils_1.Utils.comparePassword({
                        plainPassword: password,
                        encryptPassword: user.password
                    });
                    const encryptedPassword = yield Utils_1.Utils.encryptPassword(newPassword);
                    const newUser = yield User_1.default.findOneAndUpdate({ _id: user_id }, { password: encryptedPassword }, { new: true });
                    res.send(newUser);
                }));
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.UserController = UserController;
