const express = require("express");
const authController = require("../controllers/authController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/login", authController.login);
router.post("/change-password", authenticate, authController.changePassword);

module.exports = router;
