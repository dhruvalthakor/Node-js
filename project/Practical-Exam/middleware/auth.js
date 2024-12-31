const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    console.log(req.body, "auth");

    // Extract token from cookies
    const token = req.cookies["token"]; // Assuming token is stored as a cookie named "token"

    if (!token) {
      return res.status(400).json({ message: "Authorization token required" });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(400).json({ message: "Invalid token" });
    }

    // Pass the decoded user details to the request object
    req.body.userid = decoded.user._id; // User's ID for database queries
    req.body.email = decoded.user.email; // User's email if needed in requests
    req.body.password = decoded.user.password; // User's password if needed in requests

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Authentication failed", error: error.message });
  }
};

module.exports = auth;
