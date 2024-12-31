const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { conection } = require("./config/db");
const userRouter = require("./routes/userRouter");
const auth = require("./middleware/auth");
var cookieParser = require('cookie-parser');
const recipesRouter = require("./routes/recipesRouter");
const myrecipesRouter = require("./routes/myrecipes");

dotenv.config();


app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cookieParser())

app.use("/",userRouter);
// app.use(auth);
app.use("/recipe",recipesRouter);
app.use("/myrecipe",myrecipesRouter);




app.listen(process.env.PORT,(error) => {
  if (error) {
    console.log("server is not running");
    return;
  }
  console.log("server is running on port",process.env.PORT);
  conection();
});