const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: "string",
  },
  username: {
    type: "string",
  },
  password: {
    type: "string",
  },
});

module.exports = mongoose.model("users", userSchema);
