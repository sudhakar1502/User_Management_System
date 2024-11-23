const express=require('express');
const route=express.Router();
const controller=require('../Controller/usercontroller.js');
const services=require('../Services/services.js');



route.post('/api/users',controller.create);

route.get('/api/users',controller.find);

route.put('/api/users/:id',controller.update);

route.delete('/api/users/:id',controller.delet);



module.exports=route;

