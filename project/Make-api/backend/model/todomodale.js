const mongoose=require("mongoose");

const todoshema=mongoose.Schema({
    todoid:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "userdata",
    },
    todolist:{
        type: String,
        required: true,
    },
   
});

const todomodel=mongoose.model("tododata",todoshema);

module.exports=todomodel;