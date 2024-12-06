const express = require("express");
const userModel = require("../model/userdatamodel");
const path = require("path");
const passport = require("passport");
const dashbordrouter = express.Router()

dashbordrouter.get("/", async (req, res) => {
    const cookiedata = req.cookies["auth"];
    if (cookiedata) {
        res.redirect("/desabord");
        return;
    }
    res.render("singin")
})

dashbordrouter.get("/signup", (req, res) => {
    res.render("singup")

})

dashbordrouter.get("/desabord", (req, res) => {
    const cookiedata = req.cookies["auth"];
    if (!cookiedata) {
        res.redirect("/");
        return;
    }
    res.render("desabord")

})

dashbordrouter.get("/tables", async (req, res) => {
    const userdata = await userModel.find({})
    const cookiedata = req.cookies["auth"];
    if (!cookiedata) {
        res.redirect("/");
        return;
    }
    res.render("tables", { userdata })
})

dashbordrouter.post("/inserdata", userModel.imageUpload, async (req, res) => {
    try {
        if (req.file) {
            req.body.Userprofile = userModel.imagePath + "/" + req.file.filename;
        }
        await userModel.create(req.body);
        console.log("data added successfully");
        res.redirect("/");

    } catch (error) {
        console.log(error);
    }
})

dashbordrouter.post("/login",passport.authenticate("local",{failureRedirect:"/"}),async(req, res) => {
    return res.redirect("/desabord");
    // const { Username, Userpassword } = req.body;
    // const getuserdata = await userModel.findOne({ Username })
    // // console.log(getuserdata);
    // if (getuserdata) {
    //     if (getuserdata.Userpassword !== Userpassword) {

    //         console.log("envalid");
    //         res.redirect("/")
    //         return;
    //     }
    // } else {
    //     console.log("user not found");
    //     res.redirect("/")
    //     return;
    // }
    // res.cookie("auth", getuserdata)
    // console.log("hello");
    


});


dashbordrouter.get("/changepassword", (req, res) => {
    const cookiedata = req.cookies["auth"];

    if (!cookiedata) {
        console.log(cookiedata);
        res.redirect("/");
        return;
    }
    res.render("changepassword")
})

dashbordrouter.post("/changepasswords", async (req, res) => {
    const cookiedata = req.cookies["auth"];
    if (!cookiedata) {
        console.log(cookiedata);
        res.redirect("/");
        return;
    } else {
        if (req.body.oldPassword === cookiedata.Userpassword) {
            if (req.body.newPassword !== req.body.oldPassword) {
                if (req.body.confirmPassword === req.body.newPassword) {
                    console.log(cookiedata._id);
                    await userModel.findByIdAndUpdate(cookiedata._id,{ Userpassword: req.body.newPassword })
                    console.log("password changed")
                    await res.clearCookie("auth");
                    await res.redirect("/");
                } else { res.redirect("back") }
            } else { res.redirect("back") }
        } else { res.redirect("back") }
    }
});

dashbordrouter.get("/logout", (req, res) => {
    res.clearCookie("auth")
    res.redirect("/")
})



module.exports = dashbordrouter