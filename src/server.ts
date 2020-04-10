import * as express from 'express';
import * as mangoose from 'mongoose';
import { getEnvironmentVariables } from './environments/env';
import UserRouter from './routers/UserRouter';
import bodyParser = require('body-parser');


export class Server {
    public app:express.Application = express();

    constructor(){
        this.setConfiguration();
        this.setRoutes();
        this.error404handler();
        this.handlesError();
    }

    setConfiguration(){

        this.connectMongodb();
        this.configureBodyparser();

    }

    connectMongodb() {

        const databaseUrl = getEnvironmentVariables().db_url;
        mangoose.connect(databaseUrl,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>{
        console.log('Mongodb is connected');
    }).catch(err => console.log(err));

    }

    configureBodyparser() {
        this.app.use(bodyParser.urlencoded({extended: true}))

    }

    setRoutes(){

        this.app.use('/api/user',UserRouter)

    }

    error404handler(){
        this.app.use((req,res)=>{

            res.status(404).json({
                message: 'Not Found',
                status_code: 404
            });

        });
    }

    handlesError(){
        this.app.use((error,req,res,next)=>{

            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something Went Wrong',
                status_code: errorStatus   
            })

        });
    }
}