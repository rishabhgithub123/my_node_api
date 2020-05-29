"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const express_validator_2 = require("express-validator");
const User_1 = require("../models/User");
class UserValidators {
    static signUp() {
        return [
            express_validator_1.body('email', 'Email is Required').isEmail().custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        throw new Error('User Already Exist');
                    }
                    else {
                        return true;
                    }
                });
            }),
            express_validator_1.body('password', 'Password is Required').isAlphanumeric().isLength({ min: 8, max: 20 }).withMessage('Password can be from 8-20 Characters only'),
            express_validator_1.body('username', 'Username is Required').isString(),
        ];
    }
    static verifyUser() {
        return [express_validator_1.body('verification_token', 'Verification Token is Required').isNumeric(),
        ];
    }
    static resendVerificationEmail() {
        return [express_validator_2.query('email', 'Email is Required').isEmail()];
    }
    static updatePassword() {
        return [express_validator_1.body('password', 'Password is Required').isAlphanumeric(),
            express_validator_1.body('confirm_password', 'Condirm Password is Required').isAlphanumeric(),
            express_validator_1.body('new_password', 'New Password is Required').isAlphanumeric()
                .custom((newPassword, { req }) => {
                if (newPassword === req.body.confirm_password) {
                    return true;
                }
                else {
                    req.errorStatus = 422;
                    throw new Error('Password and Confirm Password Does not Match');
                }
            })];
    }
    static login() {
        return [express_validator_2.query('email', 'Email is Required').isEmail().custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error('User Does Not Exist');
                    }
                });
            }), express_validator_2.query('password', 'Password is Required').isAlphanumeric()];
    }
}
exports.UserValidators = UserValidators;
