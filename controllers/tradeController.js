const Trade = require("../models/tradeModel");

exports.getAllTrades = async (req, res, next) => {
  try {
    const trades = await Trade.find();
    res.status(200).json({
      status: "success",
      results: trades.length,
      data: {
        trades,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.getAllTradesUser = async (req, res, next) => {
  try {
    const trades = await Trade.find({ userId: req.session.user.username });
    res.status(200).json({
      status: "success",
      data: {
        trades,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.getOneTrade = async (req, res, next) => {
  try {
    const trade = await Trade.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        trade,
      },
    });
  } catch (e) {
    res.ststus(400).json({
      status: "fail",
    });
  }
};

exports.createTrade = async (req, res, next) => {
  try {
    const tradeObject = req.body;
    tradeObject["userId"] = req.session.user.username;
    const trade = await Trade.create(tradeObject);
    res.status(200).json({
      status: "success",
      data: {
        trade,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.updateTrade = async (req, res, next) => {
  try {
    const trade = await Trade.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        trade,
      },
    });
  } catch (e) {
    res.ststus(400).json({
      status: "fail",
    });
  }
};

exports.deleteTrade = async (req, res, next) => {
  try {
    const trade = await Trade.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
    });
  } catch (e) {
    res.ststus(400).json({
      status: "fail",
    });
  }
};

// FRONT END STARTS HERE

exports.tradeHome = async (req, res) => {
  try {
    res.sendFile("/app/frontend/trade/tradehome.html");
  } catch (e) {
    res.status(400).json({
      status: `fail: ${e}`,
    });
  }
};

exports.tradeJs = async (req, res) => {
  try {
    res.sendFile("/app/frontend/trade/trademain.js");
  } catch (e) {
    res.status(400).json({
      status: `fail: ${e}`,
    });
  }
};

exports.tradeAddEdit = async (req, res) => {
  try {
    res.sendFile("/app/frontend/trade/tradeaddedit.html");
  } catch (e) {
    res.status(400).json({
      status: `fail: ${e}`,
    });
  }
};

exports.tradeAddEditJs = async (req, res) => {
  try {
    res.sendFile("/app/frontend/trade/tradeaddedit.js");
  } catch (e) {
    res.status(400).json({
      status: `fail: ${e}`,
    });
  }
};
