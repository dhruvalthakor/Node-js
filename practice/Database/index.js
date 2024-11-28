const express=require("express");
const app=express();
const connection =require("./cofig/db");
const UserModel = require("./model/usemodel");
const path= require("path")

const port=8000;
app.set("view engine", "ejs");

app.use(express.urlencoded());
app.use("/uploads",express.static(path.join(__dirname,"/uploads")));


app.get("/", async (req, res) => {

    const bookData = await UserModel.find({});
      res.render("data",{bookData});
    
  });

app.post("/bookadd",UserModel.imageUpload,async(req,res)=>{

    if (req.file) {
        req.body.image=UserModel.imagePath+"/"+req.file.filename
    }
   await UserModel.create(req.body);

    res.redirect("back");

})

app.get("/deletebook/:id", async(req,res)=>{
 
    await UserModel.findByIdAndDelete(req.params.id)

    console.log("Data deleted successfully");
    res.redirect("back");

})





app.listen(port,(error)=>{
    if (error) {
        console.log("server is not running");
        return;
      }
      connection();
      console.log(`Server is running on port ${port}`);
})