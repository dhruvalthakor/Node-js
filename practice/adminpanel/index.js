const express =require("express");
const dashbordrouter = require("./router/dashbordrouter");
const connection = require("./cofig/db");
const path =require("path")
const app=express();
let port = 8090;
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));


app.set("view engine", "ejs");
app.use("/assets",express.static(path.join(__dirname,"/assets")))

app.use(express.urlencoded());

app.use("/",dashbordrouter)



app.listen(port,(error)=>{
    if (error) {
        console.log(error);
        return;
      }
      connection();
      console.log("server is running on port",port);
})