const express = require("express");
const userModel = require("../model/userdatamodel");
const path = require("path");
// const passport = require("passport")
const passport = require("../cofig/passport-local");
const SubCategoryModel = require("../model/subCategory");
const CategoryModel = require("../model/CategoryModel");
const extraCategoryModel = require("../model/extraCategory");
const dashbordrouter = express.Router()

dashbordrouter.get("/", async (req, res) => {
    // const cookiedata = req.cookies["auth"];
    // if (cookiedata) {
    //     res.redirect("/desabord");
    //     return;
    // }
    res.render("singin")
})

dashbordrouter.get("/signup", (req, res) => {
    res.render("singup")

})



dashbordrouter.get("/tables", async (req, res) => {
    const userdata = await userModel.find({})
    // const cookiedata = req.cookies["auth"];
    // if (!cookiedata) {
    //     res.redirect("/");
    //     return;
    // }
    res.render("tables", { userdata })
})

dashbordrouter.post("/inserdata", userModel.imageUpload, async (req, res) => {
    try {
        if (req.file) {
            req.body.userprofile = userModel.imagePath + "/" + req.file.filename;
        }
        await userModel.create(req.body);
        console.log("data added successfully");
        res.redirect("/");

    } catch (error) {
        console.log(error);
    }
})



dashbordrouter.get("/changepassword", (req, res) => {
    // const cookiedata = req.cookies["auth"];

    // if (!cookiedata) {
    //     console.log(cookiedata);
    //     res.redirect("/");
    //     return;
    // }
    res.render("changepassword")
})

dashbordrouter.post("/changepasswords", async (req, res) => {
    // const cookiedata = req.cookies["auth"];
    // if (!cookiedata) {
    //     console.log(cookiedata);
    //     res.redirect("/");
    //     return;
    // } else {
    //     if (req.body.oldPassword === cookiedata.Userpassword) {
    //         if (req.body.newPassword !== req.body.oldPassword) {
    //             if (req.body.confirmPassword === req.body.newPassword) {
    //                 console.log(cookiedata._id);
    //                 await userModel.findByIdAndUpdate(cookiedata._id,{ Userpassword: req.body.newPassword })
    //                 console.log("password changed")
    //                 await res.clearCookie("auth");
    //                 await res.redirect("/");
    //             } else { res.redirect("back") }
    //         } else { res.redirect("back") }
    //     } else { res.redirect("back") }
    // }
});

dashbordrouter.get("/logout", (req, res) => {
    req.session.destroy(function(err) {
        // cannot access session here
        console.log(err);
        
     })
    res.redirect("/")
})

dashbordrouter.post("/login",passport.authenticate("local",{failureRedirect :"/"}) , (req, res) => {
     console.log("hellow from login")

   return res.redirect("/desabord");
})

dashbordrouter.get("/desabord",passport.isAuth,(req, res) => {
    console.log("hello from dashbaord")
    res.render("desabord")

})


dashbordrouter.get("/addCategory", (req, res) => {
    res.render("addCategory");
  });
  
  dashbordrouter.post("/insertCategory", async (req, res) => {
    try {
      console.log(req.body);
      await CategoryModel.create(req.body);
      console.log("Category created");
      res.redirect("/desabord");
    } catch (err) {
      console.log(err);
    }
  });
  
  dashbordrouter.get("/viewCategory", async (req, res) => {
    try {
      const categories = await CategoryModel.find({});
      res.render("viewCategory", { categories });
    } catch (err) {
      console.log(err);
    }
  });
  
  dashbordrouter.get("/addSubCategory", async (req, res) => {
    try {
      const categories = await CategoryModel.find({});
      res.render("addSubCategory", { categories: categories });
    } catch (err) {
      console.log(err);
    }
  });
  
  dashbordrouter.get("/addextraCategory", async (req, res) => {
    console.log("extra");

    try {
      const categories = await CategoryModel.find({});
      const subcategories = await SubCategoryModel.find({});
      res.render("addextraCategory", { categories: categories ,subcategories:subcategories});
    } catch (err) {
      console.log(err);
    }
  });

  dashbordrouter.post("/insertSubCategory", async (req, res) => {
    try {
      await SubCategoryModel.create(req.body);
      console.log("Subcategory created");
      res.redirect("/viewSubCategory")
    } catch (err) {
      console.log(err);
    }
  });

  dashbordrouter.post("/insertextraCategory", async (req, res) => {
    
    
    try {
      await extraCategoryModel.create(req.body);
      console.log("extracategory created");
      res.redirect("/viewextraCategory")

    } catch (err) {
      console.log(err);
    }
  });

  dashbordrouter.get("/viewSubCategory", async (req, res) => {
    let getData = await SubCategoryModel.find().populate("categoryId").exec();
     res.render("viewSubCategory",{getData})
   })

   dashbordrouter.get("/viewextraCategory", async (req, res) => {
  
    
    let getData = await extraCategoryModel.find().populate("categoryId").populate("subCategoryId").exec();
     res.render("viewextraCategory",{getData})
   })


module.exports = dashbordrouter