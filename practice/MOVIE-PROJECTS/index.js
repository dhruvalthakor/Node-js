const express =require("express");
const connection = require("./cofig/db");
const adminRouter = require("./routes/admin");
const app=express();
const path = require("path");
const fs = require("fs");
const bookModel = require("./model/admin");
let port = 8080;


app.set("view engine", "ejs");

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.urlencoded());

app.get("/",async(req,res)=>{
    const userData = await bookModel.find({});
res.render("bookmy",{userData})
})

app.get("/admin",(req,res)=>{
    res.render("admin")
    })
    

    app.use("/", adminRouter);


    app.get("/deleteData/:id", async (req, res) => {
        // console.log(req.params.id);
        try {
          const getDataUser = await bookModel.findById(req.params.id);
          console.log(getDataUser);
          if (getDataUser) {
            fs.unlinkSync(path.join(__dirname, getDataUser.image));
            
          }
          await bookModel.findByIdAndDelete(req.params.id);
          console.log("Data deleted successfully");
          res.redirect("back");
        } catch (err) {
          console.log(err);
        }
      });


      app.get("/editData/:id", async (req, res) => {
        const storeData = await bookModel.findById(req.params.id);
        console.log(storeData);
        res.render("update", { storeData });
      });
      
    
      app.post("/updateData/:id", bookModel.imageUpload, async (req, res) => {
        console.log(req.params.id);
        console.log(req.body);
        console.log(req.file);
        try {
          if (req.file) {
            const getDataUser = await bookModel.findById(req.params.id);
            fs.unlinkSync(path.join(__dirname, getDataUser.image));
          }
          req.body.image = bookModel.imagePath + "/" + req.file.filename;
          await bookModel.findByIdAndUpdate(req.params.id, req.body);
          console.log("Data updated successfully");
          res.redirect("/");
        } catch (err) {
          console.log(err);
        }
      });



app.listen(port,(error)=>{
    if (error) {
        console.log(error);
        return;
      }
      connection();
      console.log("server is running on port",port);
})