const mongoose=require("mongoose");

const recipeshema=mongoose.Schema({
    recipename:{
        type: String,
        required: true,
    },
});

const recipemodel=mongoose.model("recipe",recipeshema);

module.exports=recipemodel;