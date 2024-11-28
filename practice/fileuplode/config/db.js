const mongoose = require("mongoose");

const connection = async () => {
  await mongoose.connect("mongodb://localhost:27017/databasePrithvi");
  console.log("database connected");
};

module.exports = connection;