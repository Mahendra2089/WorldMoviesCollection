const express =require("express");
const cors=require("cors");
const multer=require("multer");
const mysql=require("mysql");

const app=express();
const path=require('path');
const mongoose =require("mongoose");
const bcrypt =require("bcrypt");
app.use(cors());

app.listen(9985,()=>{
    console.log("listening to the port 9985");
})
app.use(express.static(path.join(__dirname,'./project/build')))
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now()+ "-"+ file.originalname)
    }
  })
  
  const uploads = multer({ storage: storage })
  app.use("/uploads",express.static("uploads"))



let connection=async()=>{
    
try{
    await mongoose.connect(`mongodb+srv://mahendra:mahimoviesapp@cluster0.ifwfshg.mongodb.net/movies`); 

    //mahimoviesapp
    console.log("Successfully Connected to MDB");
}catch(error){
    console.log("Unable to connect MDB")
}
}
let userShema= new mongoose.Schema({
    firstName:{ 
        type:String,
        minLength:[2,"Min Length 2 Charactors"],
        maxLength:[15,"max Length 15 charactors"],
        require:true
    },
    lastName:{
        type:String,
        minLength:[2,"Min Length 2 Charactors"],
        maxLength:[15,"max Length 15 charactors"],
        require:true
    },
    emailId:{
        type:String,
        validate:{
         validator: function(v){
        return /^[A-Za-z0-9.\-\_]+\@[A-Za-z0-9.\_\-]+\.([A-Za-z]{2,4})$/.test(v);
        }},

    },
    gender:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})
let user= new mongoose.model("userDetails",userShema);
app.post("/signup",uploads.none(),async(req,res)=>{ 
    let hashPassword=await bcrypt.hash(req.body.password,6);
    let saveNewUserDetails=async()=>{
      let newUser=await new user({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        gender:req.body.gender,
        emailId:req.body.emailId,
        password:hashPassword,
      })
      try{
        await newUser.save();
        res.json({
            status:"User Created Successfully and Click on Login to Your Account",
            state:true
        })
      }catch(error){
        
        res.json({
            status:error,
            state:false
        });
      }
    }
    saveNewUserDetails();
})

app.post("/login",uploads.none(),async(req,res)=>{
 
    let data=await user.find({emailId:`${req.body.emailId}`});

    console.log(data);
    if(data.length>0){
    let comparePassword=await bcrypt.compare(req.body.password,data[0].password)

        if(comparePassword === true){
            res.json({
                loginStatus:true,
                status:"User Successfully Login",
                userDetails:data
            })
        }
        else{
            res.json({
                loginStatus:false,
                status:"Invalid Password"
            
            })
        }
    }

     else{
        res.json({
            loginStatus:false,
            status:"User Details Not Found"
            
        })
    }
})

connection();