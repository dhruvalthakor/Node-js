const mongoose = require("mongoose");

const multer = require("multer");
const path =require("path")

const imagepath="/uploads"

const bookschema = mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
    votes: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: Array,
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
  
  bookschema.statics.imageUpload = multer({ storage: storage }).single("image");

  bookschema.statics.imagePath = imagepath;


const bookModel = mongoose.model("bookData", bookschema);
module.exports = bookModel;