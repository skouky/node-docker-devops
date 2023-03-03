const express = require("express");

const tradeController = require("../controllers/tradeController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, tradeController.tradeHome);
router.route("/trademain.js").get(protect, tradeController.tradeJs);
router.route("/addedit").get(protect, tradeController.tradeAddEdit);
router.route("/tradeaddedit.js").get(protect, tradeController.tradeAddEditJs);

module.exports = router;
