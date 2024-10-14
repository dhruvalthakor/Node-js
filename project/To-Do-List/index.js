const express = require("express");

const app = express();
const port = 3000;



app.use(express.urlencoded({ extends: true }));
app.set('view engine', 'ejs');

const records = [];

app.get("/", (req, res) => {
    return res.render("home", { records });
})


app.post("/add", (req, res) => {
    const newrecord = req.body.record
    records.push(newrecord)
    res.redirect("/")
})

app.post("/edit/:index",(req,res)=>{
    const index=req.params.index;
const editIem=records[index]
res.render("edit",{record:editIem,index})
})

app.post("/update/:index",(req,res)=>{
const index =req.params.index;
records[index]=req.body.record
res.redirect("/")
})




app.get("/delete/:index",(req,res)=>{
const index=req.params.index;
records.splice(index,1)
res.redirect("/")
})



app.listen(port, () => {
    console.log("server", port);

})