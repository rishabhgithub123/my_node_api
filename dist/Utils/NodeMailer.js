"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodeMailer = require("nodemailer");
const SendGrid = require("nodemailer-sendgrid-transport");
class NodeMailer {
    static initilizerTansport() {
        return nodeMailer.createTransport(SendGrid({
            auth: {
                api_key: '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'
            }
        }));
    }
    static sendEmail(data) {
        return NodeMailer.initilizerTansport().sendMail({
            from: 'rishabh9807mishra@gmail.com',
            to: data.to,
            subject: data.subject,
            html: data.html
        });
    }
}
exports.NodeMailer = NodeMailer;
