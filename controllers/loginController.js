exports.loginHome = async (req, res) => {
  try {
    res.sendFile("/app/frontend/login/loginhome.html");
  } catch (e) {
    res.status(400).json({
      status: `fail: ${e}`,
    });
  }
};

exports.loginJs = async (req, res) => {
  try {
    res.sendFile("/app/frontend/login/loginmain.js");
  } catch (e) {
    res.status(400).json({
      status: `fail: ${e}`,
    });
  }
};

exports.loginSignup = async (req, res) => {
  try {
    res.sendFile("/app/frontend/login/loginsignup.html");
  } catch (e) {
    res.status(400).json({
      status: `fail: ${e}`,
    });
  }
};

exports.loginSignupJs = async (req, res) => {
  try {
    res.sendFile("/app/frontend/login/loginsignup.js");
  } catch (e) {
    res.status(400).json({
      status: `fail: ${e}`,
    });
  }
};
