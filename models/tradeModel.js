const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: [true, "Trade must have userId"],
  },
  brokerage: {
    type: String,
    require: [true, "Trade must have brokerage"],
  },
  date: {
    type: Date,
    required: [true, "Trade must have date"],
  },
  orderId: {
    type: String,
    require: [true, "Trade must have orderId"],
  },
  sellOrderId: {
    type: String,
    require: false,
  },
  linkOrderId: {
    type: String,
    require: false,
  },
  assetType: {
    type: String,
    require: [true, "Trade must have assetType"],
  },
  assetSymbol: {
    type: String,
    require: [true, "Trade must have assetSymbol"],
  },
  actionType: {
    type: String,
    require: [true, "Trade must have actionType"],
  },
  units: {
    type: mongoose.Schema.Types.Decimal128,
    require: [true, "Trade must have units value"],
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    require: [true, "Trade must have brokerage"],
  },
  currency: {
    type: String,
    require: [true, "Trade must have currency"],
  },
  forExRate: {
    type: String,
    require: false,
  },
  commission: {
    type: mongoose.Schema.Types.Decimal128,
    require: false,
  },
  fees: {
    type: mongoose.Schema.Types.Decimal128,
    require: false,
  },
  labels: {
    type: String,
    require: false,
  },
  notes: {
    type: String,
    require: false,
  },
});

const Trade = mongoose.model("Trade", tradeSchema);
module.exports = Trade;
