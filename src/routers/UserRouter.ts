import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserValidators } from "../validators/UserValidators";
import { GlobalErrorMIddleWare } from "../middlewares/CheckError";


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

        this.router.get('/send/verification/email',UserValidators.resendVerificationEmail(), UserController.resendVerificationEmail);
        
    }

    postRoutes() {
        this.router.post('/signup',UserValidators.signUp(), GlobalErrorMIddleWare.checkError, UserController.signUp);
        
    }

    patchRoutes() {
        this.router.patch('/verify',UserValidators.verifyUser(), GlobalErrorMIddleWare.checkError, UserController.verify);
        
    }

    deleteRoutes() {
        
    }
}

export default new UserRouter().router;