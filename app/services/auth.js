const JWT = require("jsonwebtoken");

const SECRET_KEY = "shybalghosh123";

function createAuthenticationToken(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  };

  const token = JWT.sign(payload, SECRET_KEY);
  return token;
}

function verifyAuthenticationToken(token) {
  const payload = JWT.verify(token, SECRET_KEY);
  return payload;
}

module.exports = {
  createAuthenticationToken,
  verifyAuthenticationToken,
};
