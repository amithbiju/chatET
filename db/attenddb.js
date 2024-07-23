const mongoose = require("mongoose");

const { Attendance } = require("../model/user");

async function getAllUserAttendance() {
  try {
    const attend = await Attendance.find({ enable: true }).select(
      "username  whid subjectData"
    );

    const userAttendance = attend.map((user) => ({
      username: user.username,
      whid: user.whid,
      subjectData: user.subjectData,
    }));

    return userAttendance;
  } catch (error) {
    console.error("Error fetching attendance from db:", error);
    throw error;
  }
}

//this is to save attendance data
async function saveAttendData(username, from, attendance, enable) {
  try {
    const existingUser = await Attendance.findOne({ whid: from });

    if (existingUser) {
      // Update existing user information
      existingUser.username = username;
      existingUser.subjectData = attendance;
      existingUser.enable = enable;
      await existingUser.save();
      console.log("User data updated successfully.");
    } else {
      // Save new user information
      const newAttendance = new Attendance({
        username,
        whid: from,
        subjectData: attendance,
        enable,
      });
      await newAttendance.save();
      console.log("User data saved successfully.");
    }
  } catch (error) {
    console.error("Error saving or updating user data:", error);
    throw error;
  }
}

module.exports = { getAllUserAttendance, saveAttendData };
