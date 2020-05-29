"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const UserValidators_1 = require("../validators/UserValidators");
const CheckError_1 = require("../middlewares/CheckError");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/send/verification/email', CheckError_1.GlobalErrorMiddleWare.authenticate, UserController_1.UserController.resendVerificationEmail);
        this.router.get('/login', UserValidators_1.UserValidators.login(), CheckError_1.GlobalErrorMiddleWare.checkError, UserController_1.UserController.login);
    }
    postRoutes() {
        this.router.post('/signup', UserValidators_1.UserValidators.signUp(), CheckError_1.GlobalErrorMiddleWare.checkError, UserController_1.UserController.signUp);
    }
    patchRoutes() {
        this.router.patch('/verify', UserValidators_1.UserValidators.verifyUser(), CheckError_1.GlobalErrorMiddleWare.checkError, CheckError_1.GlobalErrorMiddleWare.authenticate, UserController_1.UserController.verify);
        this.router.patch('/update/password', UserValidators_1.UserValidators.updatePassword(), CheckError_1.GlobalErrorMiddleWare.checkError, CheckError_1.GlobalErrorMiddleWare.authenticate, UserController_1.UserController.updatePassword);
    }
    deleteRoutes() {
    }
}
exports.default = new UserRouter().router;
