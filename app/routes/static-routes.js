const router = require("express").Router();

// const { handleUserSignup } = require("../controllers/user-controller");

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
