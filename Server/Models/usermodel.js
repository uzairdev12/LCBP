const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: [true, "Name is required."],
  },
  username: {
    type: "string",
    required: [true, "Username is required."],
    unique: [true, "This username is already in use."],
  },
  email: {
    type: "string",
    unique: [true, "This email is already in use."],
    required: [true, "Email is required."],
  },
  phone: {
    type: "number",
    required: [true, "Phone number is required."],
    unique: [true, "This phone number is already in use."],
  },
  password: {
    type: "string",
    required: [true, "Phone number is required."],
  },
  reffer: {
    type: "string",
    default: null,
  },
  chaintwo: {
    type: "string",
    default: null,
  },
  chainthree: {
    type: "string",
    default: null,
  },
});

module.exports = mongoose.model("users", userSchema);
