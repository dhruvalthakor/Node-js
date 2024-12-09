const express =require("express");

const app=express();
let port = 8070;




app.set("view engine", "ejs");

app.use(express.static('public'));





app.get("/",(req,res)=>{
    res.render("Dashboard")
})











app.listen(port,(error)=>{
    if (error) {
        console.log(error);
        return;
      }
    //   connection();
      console.log("server is running on port",port);
});