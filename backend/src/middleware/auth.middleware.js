const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

exports.authenticate = (req, res, next) => {
  try {
    if (!req.cookies) {
      console.log("Cookies not available. Ensure cookie-parser is used.");
      return res.status(400).json({ message: "No cookies found" });
    }

    const token = req.cookies.spotdraft;

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};