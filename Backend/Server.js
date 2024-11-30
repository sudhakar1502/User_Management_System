const express=require('express')
const dotenv=require('dotenv').config({path:"./config.env"});
const database=require('./Database/Database.js')
const userRoute=require('./Routes/User.js');
const ejs=require('ejs');
const app=express();
const path=require('path');
const exp = require('constants');
database();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('views', path.join(__dirname,'..', 'views'));

app.set('view engine',ejs);



app.use('/static',express.static(path.join(__dirname,'..', 'static')));

app.use('/',userRoute);



app.listen(process.env.PORT || 2000,()=>console.log('Server started!'));