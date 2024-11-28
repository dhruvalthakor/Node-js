const express =require("express");

const dashbordrouter=express.Router()

dashbordrouter.get("/",async(req,res)=>{
    res.render("desabord")
    })
    
    module.exports=dashbordrouter