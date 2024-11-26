const express=require('express');
const route=express.Router();
const controller=require('../Controller/usercontroller.js');
const services=require('../Services/services.js');



route.get('/',(req,res)=>{
    res.render('index.ejs');
});

route.post('/api/users',(req,res)=>{

});

route.get('/api/users',(req,res)=>{
    
});

route.put('/api/users/:id',(req,res)=>{
    
});

route.delete('/api/users/:id',(req,res)=>{
    
});



module.exports=route;

