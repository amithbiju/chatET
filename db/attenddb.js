const mongoose = require("mongoose");
const { encryptPass, decryptPass } = require("../util/encrypt");
const { User } = require("../model/user");

async function getAllUserData() {
  try {
    const users = await User.find({}).select("username name password");

    const userData = users.map((user) => ({
      username: user.username,
      name: user.name,
      password: decryptPass(user.password),
    }));

    return userData;
  } catch (error) {
    console.error("Error fetching data from db:", error);
    throw error;
  }
}
