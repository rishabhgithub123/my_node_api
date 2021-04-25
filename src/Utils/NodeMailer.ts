import * as nodeMailer from 'nodemailer';
import * as SendGrid from 'nodemailer-sendgrid-transport';

export class NodeMailer {
    private static initilizerTansport(){
        return nodeMailer.createTransport(SendGrid({
            auth: {
                api_key: '#########################################################'
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
