const router = require("express").Router();

const {
  handleUserSignup,
  handleLogin,
} = require("../controllers/user-controller");

router.post("/register", handleUserSignup);
router.post("/login", handleLogin);

module.exports = router;
