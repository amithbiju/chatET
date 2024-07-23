const express = require("express");
const { Client, LocalAuth, MessageMedia, Buttons } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const mongoose = require("mongoose");
const { fetchUserData, fetchUserAttendance } = require("./api/fetcher");
const cron = require("node-cron");

const { saveUserData, getUserData } = require("./db/userdb");
const { getAllUserAttendance, saveAttendData } = require("./db/attenddb");
const { isloged } = require("./db/loged");

const { getAbsentSubjects } = require("./util/absentfind");

// Assuming you have the JSON list stored in a variable
const subjectNames = {
  CST301: "Computer Science Theory",
  CST303: "Software Engineering",
  CST305: "Algorithms",
  CST307: "Operating Systems",

  Total: "Total Attendance",
  Percentage: "Attendance Percentage",
};

const app = express();
const port = 3000;
//db conn.
const mongoUri = "mongodb://0.0.0.0:27017/chatet";

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(port, () => {
  console.log("server started");
});

// Create a new client instance
const client = new Client({
  webVersionCache: {
    type: "none",
  },
  authStrategy: new LocalAuth(),
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Client is ready!");
});

client.on("message", (msg) => {
  if (msg.body == "!ping") {
    msg.reply("This is CHAT ET");
  }
});

//LOGIN
let loginStates = {}; // Track login state for each user

client.on("message", async (msg) => {
  const from = msg.from;

  if (!loginStates[from]) {
    loginStates[from] = {
      awaitingUsername: false,
      awaitingPassword: false,
      isloggedin: false,
      currentUserId: "",
      currentPassword: "",
    };
  }

  const state = loginStates[from];

  if (
    msg.body === "!login" &&
    !state.awaitingUsername &&
    !state.awaitingPassword
  ) {
    try {
      const userName = await isloged(from);
      if (userName) {
        await msg.reply(
          `You are already logged in as ${userName}.\nWant to change login credentials, Try "!signin".`
        );
        state.isloggedin = true;
      } else {
        state.awaitingUsername = true;
        await msg.reply("Plz enter the EtLab userID.");
      }
    } catch (error) {
      console.error("Error during login check:", error);
      await msg.reply("There was an error checking your login status.");
    }
  } else if (state.awaitingUsername && from === msg.from && !state.isloggedin) {
    state.currentUserId = msg.body;
    state.awaitingUsername = false;
    state.awaitingPassword = true;
    await msg.reply("Plz enter the EtLab password.");
  } else if (state.awaitingPassword && from === msg.from && !state.isloggedin) {
    state.currentPassword = msg.body;

    state.awaitingPassword = false;
    state.isloggedin = false;
    // Fetch user data from API
    try {
      const user = await fetchUserData(
        state.currentUserId,
        state.currentPassword
      );
      console.log(from);
      await saveUserData(user, from, state.currentPassword); //saving to db
      await client.sendMessage(
        msg.from,
        `Hello ${user.name} (${user.department_id}) welcome to ChatET`
      );
      await client.sendMessage(
        msg.from,
        "User data saved successfully.\n(❗We recomment to delete the password message due to privacy concerns.)"
      );
    } catch (error) {
      await client.sendMessage(
        msg.from,
        "Sorry, there was an error fetching the user"
      );
    }
    console.log(state.currentUserId);
    console.log(state.currentPassword);

    // Reset state
    state.currentUserId = "";
    state.currentPassword = "";
  }
});

//SIGNIN
let signinStates = {}; // Track login state for each user

client.on("message", async (msg) => {
  const from = msg.from;

  if (!signinStates[from]) {
    signinStates[from] = {
      awaitingUsername: false,
      awaitingPassword: false,
      currentUserId: "",
      currentPassword: "",
    };
  }

  const state = signinStates[from];

  if (
    msg.body === "!signin" &&
    !state.awaitingUsername &&
    !state.awaitingPassword
  ) {
    state.awaitingUsername = true;
    await msg.reply("Plz enter the EtLab userID.");
  } else if (state.awaitingUsername && from === msg.from) {
    state.currentUserId = msg.body;
    state.awaitingUsername = false;
    state.awaitingPassword = true;
    await msg.reply("Plz enter the EtLab password.");
  } else if (state.awaitingPassword && from === msg.from) {
    state.currentPassword = msg.body;

    state.awaitingPassword = false;

    // Fetch user data from API
    try {
      const user = await fetchUserData(
        state.currentUserId,
        state.currentPassword
      );
      console.log(from);
      await saveUserData(user, from, state.currentPassword); //saving to db
      await client.sendMessage(
        msg.from,
        `Hello ${user.name} (${user.department_id}) welcome to ChatET`
      );
      await client.sendMessage(
        msg.from,
        "User data saved successfully.\n(❗We recomment to delete the password message due to privacy concerns.)"
      );
    } catch (error) {
      await client.sendMessage(
        msg.from,
        "Sorry, there was an error fetching the user"
      );
    }
    console.log(state.currentUserId);
    console.log(state.currentPassword);

    // Reset state
    state.currentUserId = "";
    state.currentPassword = "";
  }
});

//attendence
client.on("message", async (msg) => {
  if (msg.body === "!att") {
    const from = msg.from;
    try {
      const userGet = await getUserData(from);
      if (userGet) {
        await msg.reply(`G’day! ${userGet.name}.\nLoading attendance...`);
        const attendance = await fetchUserAttendance(
          userGet.userid,
          userGet.password
        );
        const attend = attendance.slice(0, -2);
        const total = attendance.slice(-2);
        let attendList = "Subject wise attendance:-:\n";
        attend.forEach((attend, index) => {
          const subjectName = subjectNames[attend.subject] || attend.subject;
          attendList += `${index + 1}. ${subjectName} ->\n${
            attend.attendance
          }\n`;
        });
        let totalList = "Total attendance:-:\n";
        total.forEach((total, index) => {
          totalList += `${total.subject}  ->  ${total.attendance}\n`;
        });
        await client.sendMessage(msg.from, attendList);
        await client.sendMessage(msg.from, totalList);
      } else {
        await msg.reply("Plz login to get attendance !");
      }
    } catch (error) {
      console.error("Error fetching attendance", error);
      await client.sendMessage(
        msg.from,
        "Sorry, there was an error fetching your attendance"
      );
    }
  }
});

//auto_absent

client.on("message", async (msg) => {
  if (msg.body === "!ab-enable") {
    const from = msg.from;
    try {
      const userGet = await getUserData(from);
      if (userGet) {
        await msg.reply(
          `G’day! ${userGet.name}. You have enabled Absent detection and Notification provider.`
        );
        const attendance = await fetchUserAttendance(
          userGet.userid,
          userGet.password
        );
        await saveAttendData(userGet.userid, from, attendance, true); //saving to db
      } else {
        await msg.reply("Plz login to enable it!");
      }
    } catch (error) {
      console.error("Error fetching attendance", error);
      await client.sendMessage(
        msg.from,
        "Sorry, there was an error fetching your attendance"
      );
    }
  }
});

client.on("ready", async () => {
  //cron.schedule("* * * * *", async () => {
  try {
    const users = await getAllUserAttendance();
    for (const user of users) {
      const message = `Hello ${user.username}, this is a automated message from ChatET. sheduled`;
      await client.sendMessage(user.whid, message);
      console.log(`Message sent to ${user.username} (${user.whid})`);
      try {
        const userGet = await getUserData(user.whid);
        if (userGet) {
          const todayAttendance = await fetchUserAttendance(
            userGet.userid,
            userGet.password
          );
          getAbsentSubjects(user.subjectData, todayAttendance)
            .then((absentSubjects) =>
              console.log("Absent subjects:", absentSubjects)
            )
            .catch((error) => console.error("Error:", error));

          await saveAttendData(userGet.userid, user.whid, todayAttendance); //saving to db
        }
      } catch (error) {
        console.error("Error fetching attendance new ", error);
      }
    }
  } catch (error) {
    console.error("Error sending messages:", error);
  }
  // });
});
// When the client received QR-Code
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

// Start your client
client.initialize();
