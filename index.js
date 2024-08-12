const express = require("express");
const { Client, LocalAuth, MessageMedia, Contact } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const mongoose = require("mongoose");
const { fetchUserData, fetchUserAttendance } = require("./api/fetcher");
const cron = require("node-cron");

const { saveUserData, getUserData, deleteUserData } = require("./db/userdb");
const {
  getAllUserAttendance,
  saveAttendData,
  getUserAttendance,
} = require("./db/attenddb");
const { isloged } = require("./db/loged");

const { getAbsentSubjects } = require("./util/absentfind");
const { timetable } = require("./util/timetable");
const {
  privacynote,
  team,
  helpmsg,
  aboutmsg,
  startmsgout,
  support,
  dev,
} = require("./constants/constants");
const { hi_msg_in, start_msg_in } = require("./constants/message");
const { subjectNames } = require("./constants/subjectname");

const app = express();
const port = 3000;
//db conn.
const mongoUri =
  "mongodb+srv://htimaamith:NZ7E4YgHmD28jScF@chatet.pgzqhma.mongodb.net/?retryWrites=true&w=majority&appName=chatet";

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(port, () => {
  console.log("server started");
});
//mongodb+srv://htimaamith:<password>@chatet.pgzqhma.mongodb.net/
// Create a new client instance
const client = new Client({
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process",
      "--disable-gpu",
    ],
  },
  webVersionCache: {
    type: "none",
  },
  authStrategy: new LocalAuth(),
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Client is ready!");
});
client.on("message", async (msg) => {
  const from = msg.from;
  try {
    const userName = await isloged(from);
    if (userName) {
      if (/^(hi|hello)$/i.test(msg.body)) {
        msg.reply(hi_msg_in(userName));
      } else if (msg.body == "/help" || /^(help)$/i.test(msg.body)) {
        msg.reply(helpmsg);
      } else if (msg.body == "/start" || /^(start)$/i.test(msg.body)) {
        msg.reply(start_msg_in(userName));
      }
    } else {
      if (/^(hi|hello)$/i.test(msg.body)) {
        msg.reply(himsgout);
      } else if (msg.body == "/help" || /^(help)$/i.test(msg.body)) {
        msg.reply(helpmsg);
      } else if (msg.body == "/start" || /^(start)$/i.test(msg.body)) {
        msg.reply(startmsgout);
      }
    }
  } catch (error) {
    console.error("Error during login check:", error);
    await msg.reply("There was an error checking your login status.");
  }
});

client.on("message", (msg) => {
  if (msg.body == "/about" || /^(about)$/i.test(msg.body)) {
    msg.reply(aboutmsg);
  }
});
client.on("message", (msg) => {
  if (msg.body == "/privacy" || /^(privacy)$/i.test(msg.body)) {
    msg.reply(privacynote);
  } else if (msg.body == "/team" || /^(team)$/i.test(msg.body)) {
    msg.reply(team);
  }
});
client.on("message", async (msg) => {
  if (msg.body === "/dev" || /^(dev)$/i.test(msg.body)) {
    msg.reply(dev);
  } else if (msg.body == "/support" || /^(support)$/i.test(msg.body)) {
    msg.reply(support);
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
    (msg.body === "/login" || /^(login)$/i.test(msg.body)) &&
    !state.awaitingUsername &&
    !state.awaitingPassword
  ) {
    try {
      const userName = await isloged(from);
      if (userName) {
        await msg.reply(
          `You are already logged in as ${userName}. No need of logging in again 😉.\nWant to try * /chguser*?\n\n _This command allows you to automatically logout from your current user and prompt you to login to another account._`
        );
        state.isloggedin = true;
      } else {
        state.awaitingUsername = true;
        await msg.reply(
          "❗Please note that we are sourcing your attendance from ETLab and therefore we require your UserID and Password. " +
            "Don't worry *your credentials are encrypted* 😌."
        );
        await msg.reply(
          "Please enter your *ETLab UserID*." +
            "(PS: ❗It is your *College Admission Number '2*****'*)"
        );
      }
    } catch (error) {
      console.error("Error during login check:", error);
      await msg.reply("There was an error checking your login status.");
    }
  } else if (state.awaitingUsername && from === msg.from && !state.isloggedin) {
    state.currentUserId = msg.body;
    state.awaitingUsername = false;
    state.awaitingPassword = true;
    await msg.reply("Please enter your *ETLab password*.");
  } else if (state.awaitingPassword && from === msg.from && !state.isloggedin) {
    state.currentPassword = msg.body;
    await client.sendMessage(
      msg.from,
      "Please wait.. validating credentials🧐"
    );
    state.awaitingPassword = false;
    state.isloggedin = false;
    // Fetch user data from API
    try {
      const user = await fetchUserData(
        state.currentUserId,
        state.currentPassword
      );
      console.log(from);
      await saveUserData(user.user_data, from, state.currentPassword); //saving to db
      await saveAttendData(
        user.user_data.username,
        from,
        user.subject_data,
        true
      ); //saving to db
      await client.sendMessage(
        msg.from,
        `Hello ${user.user_data.name} (${user.user_data.department_id}), Welcome to *ChatET* 😎.\nYou can start exploring by literally texting 'start' 😯.\n\n ❗Note : Absence Detection Notification enabled by default.`
      );
      await client.sendMessage(
        msg.from,
        "❗ We recommend you to 'Delete for Everyone' your password message due to privacy concerns. " +
          "This is an important step. To know more about your privacy, type '/privacy'. (Advice you to start with 'start')"
      );
    } catch (error) {
      await client.sendMessage(
        msg.from,
        "Login failed 😔!!! Please check your UserID and Password & try again using the '/login' command."
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
    (msg.body === "/chguser" || /^(chguser)$/i.test(msg.body)) &&
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
    await client.sendMessage(msg.from, "Plz wait.. validating🧐");
    state.currentPassword = msg.body;
    state.awaitingPassword = false;

    // Fetch user data from API
    try {
      const user = await fetchUserData(
        state.currentUserId,
        state.currentPassword
      );
      console.log(from);
      await saveUserData(user.user_data, from, state.currentPassword); //saving to db
      await saveAttendData(
        user.user_data.username,
        from,
        user.subject_data,
        true
      ); //saving to db
      await client.sendMessage(
        msg.from,
        `Hello ${user.user_data.name} (${user.user_data.department_id}), Welcome to *ChatET* 😎.\n You can start exploring by literally texting 'start' 😯.\n\n ❗Note : Absence Detection Notification enabled by default`
      );
      await client.sendMessage(
        msg.from,
        "❗ We recommend you to 'Delete for Everyone' your password message due to privacy concerns.\n " +
          "This is an important step. To know more about your privacy, type '/privacy'. (Advice you to start with 'start')"
      );
    } catch (error) {
      await client.sendMessage(
        msg.from,
        "Login failed 😔!!! Please check your UserID and Password & try again using the '/login' command."
      );
    }
    console.log(state.currentUserId);
    console.log(state.currentPassword);

    // Reset state
    state.currentUserId = "";
    state.currentPassword = "";
  }
});

//signout
let userConfirmationState = {};

client.on("message", async (msg) => {
  const from = msg.from;

  if (msg.body === "/logout" || /^(logout)$/i.test(msg.body)) {
    try {
      const userGet = await getUserData(from);
      if (userGet) {
        // Store userGet in the state along with the awaiting confirmation state
        userConfirmationState[from] = {
          state: "awaiting_confirmation",
          user: userGet,
        };
        await msg.reply(
          `Hi ${userGet.name}😊, signing out will stop _Absent notification system_ \n would you like to continue? *y or n*`
        );
      } else {
        await msg.reply("You are not logged in😌");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      await client.sendMessage(
        from,
        "Sorry, there was an error fetching your user details😥"
      );
    }
  } else if (
    userConfirmationState[from] &&
    userConfirmationState[from].state === "awaiting_confirmation"
  ) {
    const reply = msg.body.trim().toLowerCase();
    const userGet = userConfirmationState[from].user; // Retrieve userGet from the state

    if (reply === "y") {
      try {
        await deleteUserData(from);
        await msg.reply(
          `Signed Out successfully!!😌 \nIt was a pleasure to have you on board, ${userGet.name}😊`
        );
      } catch (error) {
        console.error("Error deleting user data:", error);
        await msg.reply("Sorry, there was an error signing you out😥");
      }
    } else if (reply === "n") {
      await msg.reply(`Good to see you again! ${userGet.name}😊`);
    }
    delete userConfirmationState[from]; // Reset the state after handling the confirmation
  }
});

//attendence
client.on("message", async (msg) => {
  if (
    msg.body === "/attendance" ||
    msg.body === "/att" ||
    /^(att)$/i.test(msg.body)
  ) {
    const from = msg.from;
    try {
      const userGet = await getUserData(from);
      if (userGet) {
        await msg.reply(`G’day! ${userGet.name}🤗.\nLoading attendance...`);
        const attendance = await fetchUserAttendance(
          userGet.userid,
          userGet.password
        );
        const attend = attendance.slice(0, -2);
        const total = attendance.slice(-2);
        let attendList = "*Subject wise attendance*\n";
        attend.forEach((attend, index) => {
          const subjectName = subjectNames[attend.subject] || attend.subject;
          attendList += `${index + 1}. _${subjectName}_ \n        *${
            attend.attendance
          }*\n\n`;
        });
        let totalList = "_Total attendance:-_\n";
        total.forEach((total, index) => {
          totalList += `${total.subject}  ->  *${total.attendance}*\n`;
        });
        await client.sendMessage(msg.from, attendList);
        await client.sendMessage(msg.from, totalList);
      } else {
        await msg.reply(
          "Please login to get your attendance !😌. Use `/login`"
        );
      }
    } catch (error) {
      console.error("Error fetching attendance", error);
      await client.sendMessage(
        msg.from,
        "Sorry, an error has occured in retrieving your attendance. Please try again later. If this issue persists, please contact '/support'."
      );
    }
  }
});

//auto_absent

client.on("message", async (msg) => {
  if (msg.body === "/notify" || /^(notify)$/i.test(msg.body)) {
    const from = msg.from;
    try {
      const userGet = await getUserData(from);
      const userAtt = await getUserAttendance(from);
      if (userGet && userAtt.enable == false) {
        await msg.reply(
          `Hey ${userGet.name} 🤗,` +
            "You have successfully *enabled* Absence Detection Notification. You will now be notified everyday morning, if you ever missed a class."
        );
        const attendance = await fetchUserAttendance(
          userGet.userid,
          userGet.password
        );
        await saveAttendData(userGet.userid, from, attendance, true); //saving to db
      } else if (userGet && userAtt.enable == true) {
        await msg.reply(
          `Hey ${userGet.name} 🤗.\nIt seems you already have *enabled* Absence Detection Notification 😉`
        );
      } else {
        await msg.reply("Please login to enable it!😥");
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

client.on("message", async (msg) => {
  if (msg.body === "/stopab" || /^(stopab)$/i.test(msg.body)) {
    const from = msg.from;
    try {
      const userGet = await getUserData(from);
      if (userGet) {
        await msg.reply(
          `Hey ${userGet.name} 🤗.\nYou have successfully *disabled* Absence Detection Notification.`
        );
        const attendance = null;
        await saveAttendData(userGet.userid, from, attendance, false); //saving to db
      } else {
        await msg.reply("Please login to disable it!😥");
      }
    } catch (error) {
      console.error("Error fetching user data", error);
      await client.sendMessage(
        msg.from,
        "Sorry, there was an error fetching your user data"
      );
    }
  }
});

client.on("ready", async () => {
  cron.schedule("30 08 * * *", async () => {
    try {
      const users = await getAllUserAttendance();
      for (const user of users) {
        try {
          console.log(user);
          const userGet = await getUserData(user.whid);
          if (userGet) {
            const todayAttendance = await fetchUserAttendance(
              userGet.userid,
              userGet.password
            );
            getAbsentSubjects(user.subjectData, todayAttendance)
              .then(async (absentSubjects) => {
                if (absentSubjects) {
                  console.log("Absent subjects:", absentSubjects);
                  const absent = absentSubjects;
                  let absentList = `Good Morning!🌞\n🛑 This is an automated message to let you know that\nYou (${user.username}) were marked absent 👀 for the following hours:-\n`;
                  absent.forEach((absent, index) => {
                    const subjectName = subjectNames[absent] || absent;
                    absentList += `${index + 1}. *${subjectName}*\n`;
                  });
                  absentList +=
                    "Please contact your subject teacher ASAP if you were present..\nTo check you current attendance, type `/att` or `att`";
                  await client.sendMessage(user.whid, absentList);
                  console.log(
                    `Message sent to ${user.username} (${user.whid})`
                  );
                }
              })
              .catch((error) => console.error("Error:", error));

            await saveAttendData(
              userGet.userid,
              user.whid,
              todayAttendance,
              true
            ); //update the to db
          }
        } catch (error) {
          console.error("Error fetching attendance new ", error);
        }
      }
    } catch (error) {
      console.error("Error sending messages:", error);
    }
  });
});

timetable(client);
// When the client received QR-Code
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

// Start your client
client.initialize();
