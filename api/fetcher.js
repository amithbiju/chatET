const axios = require("axios");
const { scrapUrl } = require("../constants/constants");

async function fetchUserData(username, password) {
  try {
    const response = await axios.post(scrapUrl, {
      password: password,
      username: username,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

async function fetchUserAttendance(username, password) {
  try {
    const response = await axios.post(`${scrapUrl}/att`, {
      password: password,
      username: username,
    });
    return response.data.subject_data;
  } catch (error) {
    console.error("Error fetching attendance:", error);
    throw error;
  }
}

async function fetchtimetable(username, password) {
  try {
    const response = await axios.post(`${scrapUrl}/timetable`, {
      password: password,
      username: username,
    });
    return response.data.timetable;
  } catch (error) {
    console.error("Error fetching attendance:", error);
    throw error;
  }
}

module.exports = { fetchUserData, fetchUserAttendance, fetchtimetable };
