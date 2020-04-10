export declare class NodeMailer {
    private static initilizerTansport;
    static sendEmail(data: {
        to: [string];
        subject: string;
        html: string;
    }): Promise<any>;
}
