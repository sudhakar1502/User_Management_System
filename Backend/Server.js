const express=require('express')
const dotenv=require('dotenv').config({path:"./config.env"});
const database=require('./Database/Database.js')
const userRoute=require('./Routes/User.js');
const ejs=require('ejs');
const app=express();

database();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use('/',userRoute);


app.listen(process.env.PORT || 2000,()=>console.log('Server started!'));