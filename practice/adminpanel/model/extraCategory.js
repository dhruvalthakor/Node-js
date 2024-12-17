const mongoose = require("mongoose");

const extraCategorySchema = mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "SubCategory",
  },
  extraCategoryName: {
    type: String,
    required: true,
  },
});

const extraCategoryModel = mongoose.model("extraCategory", extraCategorySchema);

module.exports = extraCategoryModel;