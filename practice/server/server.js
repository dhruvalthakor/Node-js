const http=require("http")
const fs=require("fs")


const myserver=http.createServer((req,res)=>{
    
const log=`New Request Recived :${Date.now()} :${req.url}\n`

fs.appendFile("log.txt",log,()=>{


switch (req.url) {
    case "/": {
        res.end("Namaste ")
       break;
     }
  case "/user": {
     res.end("Namaste User")
    break;
  }
  case "/about": {
       res.end("about User")
    break;
  }
  case "/team": {
       res.end("team User")
    break;
  }
  case "/home": {
       res.end("home User")
    break;
  }
  default: {
      res.end("404 not found")
  }
}

})

})


myserver.listen(8000,()=>{
    console.log("Server Started")
})