const { verifyAuthenticationToken } = require("../services/auth");

function checkingCookies(req, res, next) {
  const token = req.cookies.auth_token;
  if (!token) return res.status(401).json({ status: false });

  const payload = verifyAuthenticationToken(token);
  if (payload) {
    return res.render("dashboard", { status: true, payload });
  }
}

function ensureAuthenticated(req, res, next) {
  const token = req.cookies.auth_token;
  if (!token) {
    return res.send("Unauthorized access");
  }
  next();
}

module.exports = {
  checkingCookies,
  ensureAuthenticated,
};
