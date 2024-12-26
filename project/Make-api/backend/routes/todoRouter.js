const express = require("express");
const usermodel = require("../model/usermodel");
const todomodel = require("../model/todomodale");
const todoRouter=express.Router();



todoRouter.get("/",async(req,res)=>{
    console.log(req.body,"todo")
   
    const todoData=await todomodel.findOne({todoid:req.body.todoid})
    res.status(201).json({message: "todo",todoData});
})

todoRouter.post("/addtodo",async(req,res)=>{
try {
    await todomodel.create(req.body)
    res.status(201).json({ message: "todo add successfully" });
} catch (error) {
    res.status(201).json({ message:error});
}
})

todoRouter.delete("/deletetodo/:id",async(req,res)=>{ 
    try {
        await todomodel.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: " delete successfully" });
    } catch (error) {
        res.status(201).json({ message:error});
    }
    })

    todoRouter.put("/edittodo/:id",async(req,res)=>{ 
        try {
            await todomodel.findByIdAndUpdate(req.params.id,req.body)
            res.status(200).json({ message: " update successfully" });
        } catch (error) {
            res.status(201).json({ message:error});
        }
        })


module.exports=todoRouter