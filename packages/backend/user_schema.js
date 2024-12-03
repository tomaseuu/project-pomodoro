const mongoose = require("mongoose");
const validate = require("validator");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [validate.isEmail, "Invalid email"],
    },
    password: {
      type: String,
      trim: true,
      required: "Password is required",
      validate: [
        validate.isStrongPassword,
        "Please include at least 8 characters, 1 lowercase, 1 uppercase, 1 number, and 1 symbol",
      ],
    },
  },
  { collection: "users" }
);

const User = mongoose.model("User", UserSchema);

export default User;
