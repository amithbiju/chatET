const mongoose = require("mongoose");
const { encryptPass } = require("../util/encrypt");

// Define user schema and model
const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  departmentId: String,
  whid: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

async function saveUserData(userData, from, password) {
  const { username, name, department_id } = userData;
  const pass = encryptPass(password);

  try {
    const existingUser = await User.findOne({ whid: from });

    if (existingUser) {
      // Update existing user information
      existingUser.username = username;
      existingUser.name = name;
      existingUser.departmentId = department_id;
      existingUser.password = pass;
      await existingUser.save();
      console.log("User data updated successfully.");
    } else {
      // Save new user information
      const newUser = new User({
        username,
        name,
        departmentId: department_id,
        whid: from,
        password: pass,
      });
      await newUser.save();
      console.log("User data saved successfully.");
    }
  } catch (error) {
    console.error("Error saving or updating user data:", error);
    throw error;
  }
}

module.exports = { saveUserData, User };
