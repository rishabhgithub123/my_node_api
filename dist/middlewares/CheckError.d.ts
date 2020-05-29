export declare class GlobalErrorMiddleWare {
    static checkError(req: any, res: any, next: any): void;
    static authenticate(req: any, res: any, next: any): Promise<void>;
}
