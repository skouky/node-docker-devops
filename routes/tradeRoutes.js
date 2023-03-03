const express = require("express");

const tradeController = require("../controllers/tradeController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(protect, tradeController.getAllTrades)
  .post(protect, tradeController.createTrade);

router.route("/user").get(protect, tradeController.getAllTradesUser);

router
  .route("/:id")
  .get(protect, tradeController.getOneTrade)
  .patch(protect, tradeController.updateTrade)
  .delete(protect, tradeController.deleteTrade);

module.exports = router;
