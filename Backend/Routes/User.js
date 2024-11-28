const express=require('express');
const route=express.Router();
const controller=require('../Controller/usercontroller.js');
const model=require('../model/model.js');

const path=require('path');

// route.get('/',(req,res)=>{
//     console.log(path.join(__dirname, '..', 'views'));
//     res.render('index.ejs');
// });

route.post('/api/users/create',async (req,res)=>{
  const body=req.body;

  if(!body)
  {
    res.send("Field is empty!");
  }
  try
  {
     const findUser=await model.findOne({"email":body.email});
     if(findUser)
     {
      return res.json({"message":"User already present!"});
     }
     
     const user=await model.create ({name:body.name,email:body.email,status:body.status,gender:body.email});
     console.log('user',user);
     
     return res.json({"message":"user created!"});

  }
  catch(error)
  {
    res.status(500).send("Network issue!");
  }
});

route.get('/',async (req,res)=>{
      const users=await model.find({});

      res.render('index.ejs',{"users":users});
});

route.get('/add-user',(req,res)=>{
    res.render('adduser.ejs');
});

route.get('/updateuser',(req,res)=>{
    const query=req.query;
    console.log(query);
    res.render('updateuser.ejs');

});

route.delete('/deleteuser',(req,res)=>{
    const query=req.query;
});




module.exports=route;

