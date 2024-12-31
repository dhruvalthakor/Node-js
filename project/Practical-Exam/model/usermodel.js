const mongoose=require("mongoose");

const usershema=mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
    }
});

const usermodel=mongoose.model("user",usershema);

module.exports=usermodel;