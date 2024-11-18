const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    bookimg: {
    type: String,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
  Bookcatagary:{
    type: String,
    required: true,
  },
  bookprice:{
    type: String,
    required: true,
  }
});
const UserModel = mongoose.model("userDatabase", userSchema);

module.exports = UserModel;