const env = require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// importing modules
const staticRoutes = require("./routes/static-routes");
const userRoutes = require("./routes/user-routes");
const app = express();
const PORT = 5000;
const { checkingCookies } = require("./middlewares/checkCookies");

// Setting the template engine for ssr
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(cookieParser());
// Routes
app.use("/", staticRoutes);
app.use("/api", userRoutes);

// render the home page
app.get("/", (req, res) => {
  return res.render("home");
});

app.get("/dashboard", checkingCookies);

app.get("/logout", (req, res) => {
  res.clearCookie("auth_token").redirect("/");
});
mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb://admin:password@localhost:27017/demo-app?authSource=admin",
    {}
  )
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port http://127.0.0.1:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
