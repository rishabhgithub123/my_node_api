import * as nodeMailer from 'nodemailer';
import * as SendGrid from 'nodemailer-sendgrid-transport';

export class NodeMailer {
    private static initilizerTansport(){
        return nodeMailer.createTransport(SendGrid({
            auth: {
                api_key: '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'
            }
        }))
    }

    static sendEmail(data:{to:[string],subject: string, html: string}): Promise<any>{
        return NodeMailer.initilizerTansport().sendMail({
            from:'rishabh9807mishra@gmail.com',
            to: data.to,
            subject:data.subject,
            html:data.html
        })
    }
}