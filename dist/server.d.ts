import * as express from 'express';
export declare class Server {
    app: express.Application;
    constructor();
    setConfiguration(): void;
    connectMongodb(): void;
    configureBodyparser(): void;
    setRoutes(): void;
    error404handler(): void;
    handlesError(): void;
}
