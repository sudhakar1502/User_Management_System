const express=require('express')
const dotenv=require('dotenv');
const database=require('./Database/Database.js')

const app=express();

database();



app.listen(process.env.PORT || 2000,()=>console.log('Server started!'));