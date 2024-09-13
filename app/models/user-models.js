const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { createAuthenticationToken } = require("../services/auth");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "/images/defaultavatar.png",
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  { timestamps: true },
  { collection: "user" }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(user.password, salt);

  user.salt = salt;
  user.password = hashPassword;

  next();
});

userSchema.static(
  "checkCredentialsAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    // checkif user is not registered
    if (!user) return { error: "User not found" };

    // const salt = user.salt
    const hashPassword = user.password;
    const isMatched = await bcrypt.compare(password, hashPassword);

    if (!isMatched) return { error: "Invalid credentials" };

    const token = createAuthenticationToken(user);
    return token;
  }
);
const User = model("user", userSchema);

module.exports = User;
