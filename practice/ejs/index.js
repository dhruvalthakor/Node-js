const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const port = 3000


app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs")

// Static Array for all Records  // as a database

let records = [];

app.get('/', (req, res) => {
  return res.render("home",{records})
})

app.get('/index', (req, res) => {
    return res.render("index")
  })

app.get('/contact', (req, res) => {
    return res.render("contact")
  })




app.post("/add",(req,res)=>{
  const newrecords=req.body.record
  records.push(newrecords)
  res.redirect("/")
})




app.use((req,res)=>{
  return res.status(404).render("404")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})