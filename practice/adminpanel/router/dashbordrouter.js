const express =require("express");
const userModel = require("../model/userdatamodel");
const path = require("path");
const dashbordrouter=express.Router()

dashbordrouter.get("/",async(req,res)=>{
    res.render("desabord")
    })

    dashbordrouter.get("/signup",(req,res)=>{
    res.render("singup")

    })

    dashbordrouter.get("/signin",(req,res)=>{
        res.render("singin")
    
        })
    
dashbordrouter.post("/inserdata",userModel.imageUpload,async(req,res)=>{  
 try {
    if (req.file) {
        req.body.Userprofile = userModel.imagePath + "/" + req.file.filename;
    }
    await userModel.create(req.body);
    console.log("data added successfully");
    res.redirect("/");
 } catch (error) {
    console.log(error); 
 }
})

    module.exports=dashbordrouter