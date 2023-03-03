exports.adminHome = async (req, res) => {
  try {
    res.sendFile("/app/frontend/admin/adminhome.html");
  } catch (e) {
    res.status(400).json({
      status: `fail: ${e}`,
    });
  }
};

exports.adminJs = async (req, res) => {
  try {
    res.sendFile("/app/frontend/admin/adminmain.js");
  } catch (e) {
    res.status(400).json({
      status: `fail: ${e}`,
    });
  }
};
