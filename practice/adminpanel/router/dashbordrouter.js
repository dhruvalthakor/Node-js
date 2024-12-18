const express = require("express");
const userModel = require("../model/userdatamodel");
const path = require("path");
// const passport = require("passport")
const passport = require("../cofig/passport-local");
const SubCategoryModel = require("../model/subCategory");
const CategoryModel = require("../model/CategoryModel");
const extraCategoryModel = require("../model/extraCategory");
const productModel = require("../model/productModel");
const SubproductModel = require("../model/subproduct");
const extraproductModel = require("../model/extraproduct");
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

// product 
dashbordrouter.get("/addproduct", (req, res) => {
  res.render("addproduct");
});

dashbordrouter.post("/insertproduct", async (req, res) => {
  try {
    console.log(req.body);
    await productModel.create(req.body);
    console.log("product created");
    res.redirect("/addSubproduct");
  } catch (err) {
    console.log(err);
  }
});

dashbordrouter.get("/addSubproduct", async (req, res) => {
  try {
    const productes = await productModel.find({});
    res.render("addSubproduct", { productes: productes });
  } catch (err) {
    console.log(err);

  }
});

dashbordrouter.post("/insertSubproduct", async (req, res) => {
  try {
    await SubproductModel.create(req.body);
    console.log("Subcategory created");
    res.redirect("/addextraproduct")
  } catch (err) {
    console.log(err);
  }
});

dashbordrouter.get("/addextraproduct", async (req, res) => {
  console.log("extra");

  try {
    const productes = await productModel.find({});
    const subproductes = await SubproductModel.find({});
    res.render("addextraproduct", { productes: productes ,subproductes:subproductes});
  } catch (err) {
    console.log(err);
  }
});

dashbordrouter.post("/insertextraproduct", async (req, res) => {
  try {
    await extraproductModel.create(req.body);
    console.log("extracategory created");
    res.redirect("/viewextraproduct")

  } catch (err) {
    console.log(err);
  }
});

dashbordrouter.get("/viewextraproduct", async (req, res) => {
  
  let getData = await extraproductModel.find().populate("productId").populate("subproductId").exec();
   res.render("viewextraproduct",{getData})
 })

module.exports = dashbordrouter