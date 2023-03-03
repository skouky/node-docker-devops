//const User = require("../models/userModel");

//const bcrypt = require("bcryptjs");

exports.home = async (req, res) => {
  try {
    res.sendFile("/app/frontend/index.html");
  } catch (e) {
    res.status(400).json({
      status: `fail: ${e}`,
    });
  }
};

exports.homeCss = async (req, res) => {
  try {
    res.sendFile("/app/frontend/main.css");
  } catch (e) {
    res.status(400).json({
      status: `fail: ${e}`,
    });
  }
};

exports.homeJs = async (req, res) => {
  try {
    res.sendFile("/app/frontend/main.js");
  } catch (e) {
    res.status(400).json({
      status: `fail: ${e}`,
    });
  }
};
