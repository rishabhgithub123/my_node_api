import * as express from 'express';
import * as mangoose from 'mongoose';

let app:express.Application = express();

app.listen(5000,()=>{
    console.log('Hello rishabh');
});

mangoose.connect('mongodb+srv://mongodbUser:mongodbuser@mongodb-qk7bi.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>{
        console.log('Mongodb is connected');
    }).catch(err => console.log(err));

app.get('/api/user/login',(req:any,res,next)=>{
const data = [{fname:'Rishabh', lname:'Mishra'}];
     res.status(200).send(data);

});

app.get('/api/user/signup',(req,res)=>{
    res.send('This is a test');

});