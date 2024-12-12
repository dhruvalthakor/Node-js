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




dashbordrouter.get("/dashboard",passport.isAuth,(req, res) => {
    
    res.render("dashboard")

})

dashbordrouter.get("/table",passport.isAuth,async(req, res) => {
   const userdata=await usermodel.find({})
    res.render("table",{userdata})

})

dashbordrouter.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/"}),
    (req, res) => {
     
        console.log("Hello from login");
        res.redirect("/dashboard");
    }
);

dashbordrouter.get("/logout", (req, res) => {
    req.session.destroy(function(err) {
        // cannot access session here
        console.log(err);
        
     })
    res.redirect("/")
})

module.exports = dashbordrouter;