const express = require("express");
const bookModel = require("../model/admin");
const fs = require("fs");
const adminRouter = express.Router();
const path = require("path");

adminRouter.post("/adddata", bookModel.imageUpload, async (req, res) => {
    console.log(req.file);
    console.log(req.body);

    try {
        if (req.file) {
            req.body.image = bookModel.imagePath + "/" + req.file.filename;
        }
        await bookModel.create(req.body);
        console.log("data added successfully");
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.redirect("back");
        return;
    }
});


adminRouter.get("/deleteData/:id", async (req, res) => {
    console.log(req.params.id);
    try {
      const getDataUser = await bookModel.findById(req.params.id);
      console.log(getDataUser);
      if (getDataUser) {
        fs.unlinkSync(path.join(__dirname,"..",getDataUser.image));
        
      }
      await bookModel.findByIdAndDelete(req.params.id);
      console.log("Data deleted successfully");
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  });

  adminRouter.get("/editData/:id", async (req, res) => {
    const storeData = await bookModel.findById(req.params.id);
    console.log(storeData);
    res.render("update", { storeData });
  });



  adminRouter.post("/updateData/:id", bookModel.imageUpload, async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    console.log(req.file);
    try {
      if (req.file) {
        const getDataUser = await bookModel.findById(req.params.id);
        fs.unlinkSync(path.join(__dirname,"..",getDataUser.image));
      }
      req.body.image = bookModel.imagePath + "/" + req.file.filename;
      await bookModel.findByIdAndUpdate(req.params.id, req.body);
      console.log("Data updated successfully");
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  });


module.exports = adminRouter;