import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserValidators } from "../validators/UserValidators";
import { GlobalErrorMiddleWare } from "../middlewares/CheckError";


class UserRouter {
    
    public router: Router;

    constructor(){
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }    
    
    getRoutes() {

        this.router.get('/send/verification/email',GlobalErrorMiddleWare.authenticate, UserController.resendVerificationEmail);
        this.router.get('/login',UserValidators.login(), GlobalErrorMiddleWare.checkError,UserController.login);
        
    }

    postRoutes() {
        this.router.post('/signup',UserValidators.signUp(), GlobalErrorMiddleWare.checkError, UserController.signUp);
        
    }

    patchRoutes() {
        this.router.patch('/verify',UserValidators.verifyUser(), GlobalErrorMiddleWare.checkError,GlobalErrorMiddleWare.authenticate, UserController.verify);
        
    }

    deleteRoutes() {
        
    }
}

export default new UserRouter().router;