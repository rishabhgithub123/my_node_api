export declare class Utils {
    MAX_TOKEN_TIME: number;
    static generateVerificationToken(size?: number): number;
    static encryptPassword(password: string): Promise<any>;
    static comparePassword(password: {
        plainPassword: string;
        encryptPassword: string;
    }): Promise<any>;
}
