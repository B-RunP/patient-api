const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/login", authMiddleware.authenticateLocal, authController.login);
router.post("/register", authController.register);
router.get("/auth/google", authMiddleware.authenticateGoogle);
router.get(
  "/auth/google/callback",
  authMiddleware.authenticateGoogleCallback,
  authController.googleCallback
);

module.exports = router;
