const express = require("express");

const feController = require("../controllers/feController");

const router = express.Router();

router.route("/").get(feController.home);
router.route("/main.css").get(feController.homeCss);
router.route("/main.js").get(feController.homeJs);

//router.route("/login").get(feController.login);
//router.route("/login.js").get(feController.loginJs);

module.exports = router;
