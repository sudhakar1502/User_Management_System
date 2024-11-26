const express=require('express');
const route=express.Router();
const controller=require('../Controller/usercontroller.js');
const services=require('../Services/services.js');

const path=require('path');

route.get('/',(req,res)=>{
    console.log(path.join(__dirname, '..', 'views'));
    res.render('index.ejs');
});

route.post('/api/users',(req,res)=>{

});

route.get('/api/users',(req,res)=>{
    
});

route.get('/add-user',(req,res)=>{
    res.render('adduser.ejs');
});

route.put('/api/users/:id',(req,res)=>{
    
});

route.delete('/api/users/:id',(req,res)=>{
    
});




module.exports=route;

