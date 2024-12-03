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
     
     const user=await model.create ({name:body.name,email:body.email,status:body.status,gender:body.gender});
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

  const query=req.query.email;

    res.render('updateuser.ejs',{"email":query});

});

route.get('/search/:ID',async (req,res)=>{
  const params=req.params.ID;
  
  const usersByName=await model.find({"name":params}).sort({"name":1});
  const usersByEmail=await model.find({"email":params}).sort({"name":1});;

  const usersByGender=await model.find({"gender":params}).sort({"name":1});;

  const usersByStatus=await model.find({"status":params}).sort({"name":1});;


  console.log(usersByGender);
  if(usersByEmail.length>0)
  {
    return res.render('search.ejs',{"users":usersByEmail});
  }
 
  if(usersByName.length>0)
   return  res.render('search.ejs',{"users":usersByName});
  if(usersByGender.length>0)
   return  res.render('search.ejs',{"users":usersByGender});
  if(usersByStatus.length>0)
    return res.render('search.ejs',{"users":usersByStatus});

  return res.render('search.ejs',{"users":usersByName});
});

route.put('/updateuser',async(req,res)=>{

  const body=req.body;
  if(!body)
  {
    res.json({message:"body not found!"});
  }
  try
  {
        const user=await model.findOne({email:body.email});
      if(!user)
        return res.json({message:"user not found!"});

      user.name=body.name;
      user.gender=body.gender;
      user.status=body.status;
      await user.save();
      res.status(200).json({ message: "User updated successfully.", user });
  }
  catch(err)
  {
    res.json({message:"Network issue!"});

  }

});

route.delete('/deleteuser',async (req,res)=>{
    const query=req.query;
    
    if(!query)
    {
      res.json({message:"query invalid!"});
    }
    try
    {
          const user=await model.deleteOne({email:query.email});
        if(!user)
          return res.json({message:"user not found!"});
  
         
        res.status(200).json({ message: "User deleted successfully.", user });
    }
    catch(err)
    {
      res.json({message:"Network issue!"});
    }
});




module.exports=route;

