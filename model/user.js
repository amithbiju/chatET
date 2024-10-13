const mongoose = require("mongoose");

// Define user schema and model
const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  departmentId: String,
  whid: String,
  password: String,
  college: String,
});

const User = mongoose.model("User", userSchema);

// Define attendance schema and model
const attendanceSchema = new mongoose.Schema({
  username: { type: String, required: true },
  whid: String,
  enable: Boolean,
  subjectData: [
    {
      attendance: String,
      subject: String,
    },
  ],
  timestamp: { type: Date, default: Date.now },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = { User, Attendance };
