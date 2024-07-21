const mongoose = require("mongoose");
const { User } = require("../model/user");

async function isloged(from) {
  try {
    const existingUser = await User.findOne({ whid: from });

    if (existingUser) {
      return existingUser.name;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in checking logedin", error);
    throw error;
  }
}

module.exports = { isloged };
