const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "User must have a username"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "User must have a password"],
  },
  fullName: {
    type: String,
    require: [true, "User must have a fullName"],
    unique: false,
  },
  role: {
    type: String,
    require: [true, "User must have a role"],
    unique: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
