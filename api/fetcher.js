const axios = require("axios");

async function fetchUserData(username, password) {
  try {
    const response = await axios.post("http://127.0.0.1:5000/", {
      password: password,
      username: username,
    });
    return response.data.user_data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

async function fetchUserAttendance(username, password) {
  try {
    const response = await axios.post("http://127.0.0.1:5000/", {
      password: password,
      username: username,
    });
    return response.data.subject_data;
  } catch (error) {
    console.error("Error fetching attendance:", error);
    throw error;
  }
}

module.exports = { fetchUserData, fetchUserAttendance };
