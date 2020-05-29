"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mangoose = require("mongoose");
const env_1 = require("./environments/env");
const UserRouter_1 = require("./routers/UserRouter");
const bodyParser = require("body-parser");
class Server {
    constructor() {
        this.app = express();
        this.setConfiguration();
        this.setRoutes();
        this.error404handler();
        this.handlesError();
    }
    setConfiguration() {
        this.connectMongodb();
        this.configureBodyparser();
    }
    connectMongodb() {
        const databaseUrl = env_1.getEnvironmentVariables().db_url;
        mangoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
            .then(() => {
            console.log('Mongodb is connected');
        }).catch(err => console.log(err));
    }
    configureBodyparser() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
    setRoutes() {
        this.app.use('/api/user', UserRouter_1.default);
    }
    error404handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Not Found',
                status_code: 404
            });
        });
    }
    handlesError() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something Went Wrong',
                status_code: errorStatus
            });
        });
    }
}
exports.Server = Server;
