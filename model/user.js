const mongoose = require("mongoose");

// Define user schema and model
const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  departmentId: String,
  whid: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
