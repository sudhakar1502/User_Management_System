const mongoose=require('mongoose');


const database=async ()=>{
    try{
          const mongo=await mongoose.connect(process.env.MONGO_URI,{dbName:process.env.dbName});
          
          console.log('Database connected!');
    }
    catch(err)
    {
         console.log('Error in connected database!',err);
    }
}


module.exports=database;