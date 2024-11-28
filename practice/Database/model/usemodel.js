const mongoose = require("mongoose");
const path=require("path")
const multer = require("multer");


const imagePath="uploads"

const userSchema = mongoose.Schema({
  //   Image: {
  //   type: String,
  //   required: true,
  // },
  Name: {
    type: String,
    required: true,
  },
  // title:{
  //   type: String,
  //   required: true,
  // },
  // Color:{
  //   type: Array,
  //   required: true,
  // },
  // price:{
  //   type: String,
  //   required: true,
  // },
  // sideimg:{
  //   type: Array,
  //   required: true,
  // },
  image:{
    type: String,
    required: true,

  }
  
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(__dirname,"..",imagePath))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})


userSchema.statics.imageUpload = multer({ storage: storage }).single("image"); 

userSchema.statics.imagePath = imagePath;

const UserModel = mongoose.model("userDatabase", userSchema);

module.exports = UserModel;