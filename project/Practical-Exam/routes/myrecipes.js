const express = require("express");
const recipemodel = require("../model/recipesmodel");
const commentmodel = require("../model/commentsmodel");
const usermodel = require("../model/usermodel");
const myrecipesRouter=express.Router();


myrecipesRouter.get("/",async(req,res)=>{
    const recipe=await usermodel.find({});

    res.render("myrecipes",{recipe})
})


myrecipesRouter.post("/myrecipesadd",async(req,res)=>{
    try{
      await commentmodel.create(req.body);
      console.log("myrecipe add");
    res.redirect("/myrecipe/recipelist")
  } catch (err) {
    console.log(err);
  }
});

myrecipesRouter.get("/recipelist", async (req, res) => {
    const cookieemail = req.cookies["USER"];
    const recipesId = cookieemail._id;


    let getData = await commentmodel.find({recipesId: recipesId}).populate("recipesId").exec();


     res.render("recipelist",{getData})
   })
   


module.exports=myrecipesRouter;