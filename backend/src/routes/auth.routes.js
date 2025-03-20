const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { authenticate } = require("../middleware/auth.middleware");
const {
  validateRegister,
  validateLogin,
} = require("../middleware/validate.middleware");

// Auth routes
router.post("/register", validateRegister, authController.register);
router.post("/login", validateLogin, authController.login);
router.get("/profile", authenticate, authController.getProfile);
router.get("/logout",authenticate, authController.logout);
router.post("/send-otp", authController.sendOTP);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
