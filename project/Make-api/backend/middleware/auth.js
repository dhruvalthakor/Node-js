const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const auth = async(req, res, next) => {
  console.log( "auth",req.body);
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    res.status(400).json({ message: "Please login" });
    return;
  }
  const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
  console.log(decoded);

  if (decoded) {
    if (req.body.email == decoded.user.email) {
      if ( bcrypt.compare(req.body.password, decoded.user.password)) {
        req.body.todoid=decoded.user._id;
        next();
      } else {
        res.status(400).json({ message: "unauthentication password" });
      }
    } else {
      res.status(400).json({ message: "unauthentication email " });
    }
  } else {
    res.status(400).json({ message: "Please login" });
  }
};

module.exports = auth;