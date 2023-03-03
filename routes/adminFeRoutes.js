const express = require("express");

const adminController = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");
const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protectAdmin, adminController.adminHome);
router.route("/adminmain.js").get(protectAdmin, adminController.adminJs);

module.exports = router;
