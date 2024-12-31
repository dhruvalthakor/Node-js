const express = require("express");
const bcrypt = require("bcrypt");
const usermodel = require("../model/usermodel");
const jwt = require("jsonwebtoken");
const userRouter=express.Router();
const dotenv = require("dotenv");
dotenv.config();


userRouter.get("/",(req,res)=>{
  res.render("register")
})

userRouter.get("/login",(req,res)=>{
  res.render("login")
})

userRouter.get("/home",(req,res)=>{
  res.render("home");
})

userRouter.post("/adduser",async(req,res)=>{
    try{
    const existEmail = await usermodel.findOne({ email: req.body.email });
    if (!existEmail) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      await usermodel.create(req.body);
      console.log("data add");
      res.redirect("/login");
      
    } else {
      console.log("This email already exists" );
      
  
    }
  } catch (err) {
    console.log(err);
    
  }
});



userRouter.post("/loginuser", async (req, res) => {

  try {
    const user = await usermodel.findOne({ email: req.body.email });
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({ user }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        res.cookie("token", token);
        res.cookie("USER", user);
        console.log(":login");
        res.redirect("/home");
      } else {
        console.log("invalid Password");
        
        
      }
    } else {
      console.log("invalid email");
      
      
    }
  } catch (err) {
    console.log(err);
  }
});

  




module.exports=userRouter;