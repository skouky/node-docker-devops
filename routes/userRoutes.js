const express = require("express");

const authController = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const protectAdmin = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login", authController.login); // OPEN
router.delete("/logout", authController.logout); // OPEN
router.get("/state", authController.state); // OPEN
router.post("/signup", protectAdmin, authController.signUp);
router.route("/").get(protectAdmin, authController.getAllUsers);

router
  .route("/signup/:id")
  .get(protectAdmin, authController.getOneUser)
  .patch(protectAdmin, authController.updateUser)
  .delete(protectAdmin, authController.deleteUser);

module.exports = router;
