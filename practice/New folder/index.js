const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

const records=[]


app.get('/', (req, res) => {
 return res.render('home',{records});
})


app.post("/add",(req,res)=>{
const newrecords=req.body.record
records.push(newrecords);
res.redirect("/");
})

// edit 
app.post("/edit/:index",(req,res)=>{
  const index=req.params.index
  const edititem=records[index]

  res.render("update",{record:edititem,index})
})

// update
app.post("/update/:index",(req,res)=>{
  const index = req.params.index;
  records[index] = req.body.record;
  res.redirect("/");



})


// delete
app.get("/delete/:index",(req,res)=>{
  const index=req.params.index
records.splice(index,1)

res.redirect("/")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})