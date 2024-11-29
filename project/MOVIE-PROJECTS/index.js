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



app.listen(port,(error)=>{
    if (error) {
        console.log(error);
        return;
      }
      connection();
      console.log("server is running on port",port);
})