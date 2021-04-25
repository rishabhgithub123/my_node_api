import * as Bcrypt from 'bcrypt';

export class Utils {

    public MAX_TOKEN_TIME = 60000;

    static generateVerificationToken(size: number = 6){
        let digits = '0123456789';
        let otp = '';
        for(let i = 0; i<size; i++) {
            otp += digits[Math.floor(Math.random()*10)]
        }

        return parseInt(otp);
    }

    static async encryptPassword(password: string): Promise<any> {
        
        return new Promise((resolve,reject) => {

            Bcrypt.hash(password,10,(err,hash)=>{
                if(err){
                    reject(err);
                }else {
                    resolve(hash);
                }
            })
        })

    }

    static async comparePassword(password: {plainPassword:string,encryptPassword:string}): Promise<any> {

        return new Promise((resolve,reject) => {
            Bcrypt.compare(password.plainPassword,password.encryptPassword,((err,isSame)=> {

                    if(err){
                        reject(err);
                    }else if(!isSame){
                        reject(new Error('User and Password Does Not Match'));
                    }else {
                        resolve(true);
                    }
            
            }))
        })

    }

}