const express = require("express");
const recipemodel = require("../model/recipesmodel");
const recipesRouter=express.Router();


recipesRouter.get("/",(req,res)=>{
    res.render("recipeForm")
})

recipesRouter.get("/recipeItem",async(req,res)=>{
    const recipe=await recipemodel.find({});
    console.log(recipe);
    
    res.render("recipeItem",{recipe})
})



recipesRouter.post("/recipeuser",async(req,res)=>{
    try{
      await recipemodel.create(req.body);
      console.log("recipe add");
    res.redirect("/recipe/recipeItem")
  } catch (err) {
    console.log(err);
  }
});




module.exports=recipesRouter;