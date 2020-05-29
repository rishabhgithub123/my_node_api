export declare class UserValidators {
    static signUp(): import("express-validator").ValidationChain[];
    static verifyUser(): import("express-validator").ValidationChain[];
    static resendVerificationEmail(): import("express-validator").ValidationChain[];
    static updatePassword(): import("express-validator").ValidationChain[];
    static login(): import("express-validator").ValidationChain[];
}
