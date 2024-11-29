const mongoose = require("mongoose");

const multer = require("multer");
const path =require("path")

const imagepath="/uploads"

const userchema = mongoose.Schema({
    Username: {
        type: String,
        required: true,
    },
    Useremail: {
        type: String,
        required: true,
    },
    Userpassword: {
        type: String,
        required: true,
    },
    Userprofile: {
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
  
  userchema.statics.imageUpload = multer({ storage: storage }).single("Userprofile");

  userchema.statics.imagePath = imagepath;


const userModel = mongoose.model("userdata", userchema);
module.exports = userModel;