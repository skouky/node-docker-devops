const User = require("../models/userModel");

const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const { username, password, fullName, role } = req.body;
  try {
    let hashpassword;
    if (username != "inituser") {
      hashpassword = await bcrypt.hash(password, 12);
    } else {
      hashpassword = password;
    }
    const newUser = await User.create({
      username,
      password: hashpassword,
      fullName: fullName,
      role: role,
    });
    //req.session.user = newUser;
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log(`01: ${(username, password)}`);
  try {
    const user = await User.findOne({ username });
    console.log(`02: ${user}`);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "user not found",
      });
    }
    let isCorrect;
    if (user.username != "inituser") {
      isCorrect = await bcrypt.compare(password, user.password);
      console.log(`03: ${(password, user.password, isCorrect)}`);
    } else {
      if (password === user.password) {
        isCorrect = true;
        console.log(`04: ${(password, user.password, isCorrect)}`);
      } else {
        isCorrect = false;
        console.log(`05: ${(password, user.password, isCorrect)}`);
      }
    }
    if (isCorrect) {
      console.log(`06: GOOD`);
      req.session.user = user;
      res.status(200).json({
        status: "success",
      });
    } else {
      console.log(`07: BAD`);
      res.status(400).json({
        status: "fail",
        message: "incorrect username or password",
      });
    }
  } catch (e) {
    console.log(`08: FAIL`);
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    if (req.session) {
      req.session.destroy();
      console.log(`logout successful`);
      res.status(200).json({
        msg: "Logout Successful",
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.state = async (req, res) => {
  let admin;
  try {
    if (req.session.user) {
      if (req.session.user.username === "skouky@gmail.com") {
        admin = "yes";
      } else {
        admin = "no";
      }
      res.status(200).json({
        state: "Logged In",
        user: req.session.user.username,
        admin: admin,
      });
    } else {
      res.status(200).json({
        state: "Logged Out",
      });
    }
  } catch (e) {
    res.status(200).json({
      state: `Error: ${e}`,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.getOneUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (e) {
    res.ststus(400).json({
      status: "fail",
    });
  }
};

exports.updateUser = async (req, res, next) => {
  const { username, password, fullName, role } = req.body;
  let hashpassword;
  if (username != "inituser") {
    hashpassword = await bcrypt.hash(password, 12);
  } else {
    hashpassword = password;
  }
  const updateUser = {
    username: username,
    password: hashpassword,
    fullName: fullName,
    role: role,
  };
  try {
    const user = await User.findByIdAndUpdate(req.params.id, updateUser, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (e) {
    res.ststus(400).json({
      status: "fail",
    });
  }
};

exports.signUp = async (req, res) => {
  const { username, password, fullName, role } = req.body;
  try {
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashpassword,
      fullName: fullName,
      role: role,
    });
    //req.session.user = newUser;
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
    });
  } catch (e) {
    res.ststus(400).json({
      status: "fail",
    });
  }
};
