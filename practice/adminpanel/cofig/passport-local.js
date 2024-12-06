const passport = require("passport");
const PassportStrategy = require("passport-local").Strategy;
const userModel = require("../model/userdatamodel");

passport.use(new PassportStrategy({ usernameField:"Username"}, async (Username, Userpassword, done) => {
    console.log(Username,Userpassword);
    
    const userdata = await userModel.findOne({ Username: Username });
    if (userdata) {
        if (userdata.Userpassword === Userpassword) {
            done(null, userdata);
        } else {
            done(null, false);
        }
    } else {
        done(null, false);
    }

}));

passport.serializeUser(async (user, done) => {
    const userdata = await userModel.findById(user.id);
    if (userdata) {
        done(null, userdata)
    } else {
        done(null, false)
    }

});

passport.deserializeUser(async (user, done) => {
    const userdata = await userModel.findById(user.id);
    if (userdata) {
        done(null, userdata)
    } else {
        done(null, false)
    }

});


module.exports = passport;