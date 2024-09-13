const User = require("../models/user-models");
const JWT = require("jsonwebtoken");

async function handleUserSignup(req, res) {
  // if password and confirmPassword matches then ...
  try {
    const { fullName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.json({ message: "Passwords does not match", success: false });
    }

    await User.create({
      fullName,
      email,
      password,
    });
    console.log("User created successfully!!!");

    return res.status(201).json({
      message: "Please Check your email for verification",
      success: true,
    });
  } catch (error) {
    if (error.code === 11000) {
      console.log("Email already exists");
      return res.json({ message: "Email already exists", success: false });
    } else {
      throw new Error(error);
    }
  }
}

// login function handler
async function handleLogin(req, res) {
  const { email, password } = req.body;

  try {
    // check the credentials and generate a token for login
    const token = await User.checkCredentialsAndGenerateToken(email, password);

    if (token.error)
      return res.status(401).json({ message: token.error, success: false });

    console.log("Logged in successfully");
    res.cookie("auth_token", token, {
      maxAge: 3 * 24 * 3600 * 1000,
      httpOnly: false,
      withCredentials: true,
    });

    return res.status(200).redirect("/dashboard");
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Server Error" || error.message,
      success: false,
    });
  }
}

module.exports = {
  handleUserSignup,
  handleLogin,
};
