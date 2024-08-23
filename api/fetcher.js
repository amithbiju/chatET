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

async function fetchUserAttendanceImage(username, password) {
  try {
    const response = await axios({
      method: "post",
      url: `${scrapUrl}/monthatt`, // Assuming your Flask API route returns an image
      data: {
        password: password,
        username: username,
      },
      responseType: "arraybuffer", // Ensure the response is treated as binary data
    });

    // Convert the image to a base64 string
    const imageBase64 = Buffer.from(response.data, "binary").toString("base64");

    // Return the image as a base64 encoded string
    return imageBase64;
  } catch (error) {
    console.error("Error fetching attendance image:", error);
    throw error;
  }
}

module.exports = {
  fetchUserData,
  fetchUserAttendance,
  fetchtimetable,
  fetchUserAttendanceImage,
};
