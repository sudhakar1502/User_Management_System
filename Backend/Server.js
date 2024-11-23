const express=require('express')
const dotenv=require('dotenv');
const database=require('./Database/Database.js')
const userRoute=require('./Routes/User.js');
const app=express();

database();

//to parse json data from headers
app.use(express.json());

//to parse urlencoded like params and query 
app.use(express.urlencoded({extended:true}));

//to use route for crud operations
app.use('/',userRoute);


app.listen(process.env.PORT || 2000,()=>console.log('Server started!'));