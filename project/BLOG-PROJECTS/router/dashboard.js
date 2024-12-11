const express = require("express");
const usermodel = require("../model/usermodel");

const path = require("path");
// const passport = require("passport")
const passport = require("../cofig/passport-local");
const dashbordrouter = express.Router()

dashbordrouter.get("/", async (req, res) => {
   
    res.render("singin")
})

dashbordrouter.get("/singup", (req, res) => {
    res.render("singup")

})




dashbordrouter.post("/isartdata",usermodel.imgupload,async(req,res)=>{

    try {
        if (req.file) {
            req.body.profile=usermodel.imgepath+"/"+req.file.filename;
        };
        await usermodel.create(req.body);
        console.log("data add successfully");
        res.redirect("/")
        
    } catch (error) {
        console.log(error);
        
    }

});




dashbordrouter.get("/dashboard",(req, res) => {
    console.log("hello from dashbaord")
    res.render("dashboard")

})


dashbordrouter.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/"}),
    (req, res) => {
     
        console.log("Hello from login");
        res.redirect("/dashboard");
    }
);



module.exports = dashbordrouter;