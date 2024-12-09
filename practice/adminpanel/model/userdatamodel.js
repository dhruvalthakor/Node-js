const mongoose = require("mongoose");

const multer = require("multer");
const path =require("path")

const imagepath="/uploads"

const userchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    useremail: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userprofile: {
        type: String,
        required: true,
    },
  
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,"..",imagepath))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  
  userchema.statics.imageUpload = multer({ storage: storage }).single("userprofile");

  userchema.statics.imagePath = imagepath;


const userModel = mongoose.model("userdata", userchema);
module.exports = userModel;