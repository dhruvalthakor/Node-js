const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    Image: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  title:{
    type: String,
    required: true,
  },
  Color:{
    type: Array,
    required: true,
  },
  price:{
    type: String,
    required: true,
  },
  sideimg:{
    type: Array,
    required: true,
  }
  
  
});
const UserModel = mongoose.model("userDatabase", userSchema);

module.exports = UserModel;