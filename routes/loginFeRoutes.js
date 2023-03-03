const express = require("express");

const loginController = require("../controllers/loginController");
const protect = require("../middleware/authMiddleware");
const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(loginController.loginHome);
router.route("/loginmain.js").get(loginController.loginJs);

router.route("/signup").get(protectAdmin, loginController.loginSignup);
router
  .route("/loginsignup.js")
  .get(protectAdmin, loginController.loginSignupJs);

module.exports = router;
