const express = require("express");
const { Client, LocalAuth, MessageMedia, Contact } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const mongoose = require("mongoose");
const { fetchUserData, fetchUserAttendance } = require("./api/fetcher");
const cron = require("node-cron");

const { saveUserData, getUserData } = require("./db/userdb");
const { getAllUserAttendance, saveAttendData } = require("./db/attenddb");
const { isloged } = require("./db/loged");

const { getAbsentSubjects } = require("./util/absentfind");
const {
  privacynote,
  team,
  welcomemsg,
  helpmsg,
} = require("./constants/constants");
// Assuming you have the JSON list stored in a variable
const subjectNames = {
  CST301: "Computer Science Theory",

  Total: "Total Attendance",
  Percentage: "Attendance Percentage",
};

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
  if (
    msg.body === "Hi" ||
    msg.body === "hi" ||
    msg.body === "HI" ||
    msg.body === "Hello" ||
    msg.body === "hello" ||
    msg.body === "HELLO"
  ) {
    msg.reply(welcomemsg);
  } else if (msg.body == "/help") {
    msg.reply(helpmsg);
  } else if (msg.body == "/start") {
    msg.reply(
      "*Welcome to ChatET!🤩*\nFirst start using ChatEt by connecting bot with ETLab use '/login' or get commands at '/help'"
    );
  }
});

client.on("message", (msg) => {
  if (msg.body == "/about") {
    msg
      .reply(
        "*About ChatET*\nWelcome to ChatET, your personal attendance assistant!this is a simple bot Designed to simplify your academic life, ChatET provides real-time access to your attendance information directly on WhatsApp. \n\n*Features:*\n_Instant Attendance Updates:_ Quickly check your attendance status anytime. \n_Survey-Free:_ Bypass compulsory surveys on ETLab. \n_Secure Credentials:_ Your ETLab credentials are stored securely with encryption. \n_Absence Notifications:_ Get notified if you’re marked absent from any class."
      )
      .then(() => {
        msg.reply(
          "Other commands:\n*/privacy* - _Privacy and terms&conditions of users._\n*/team* - _The whole team of ChatET._\n*/dev* - _Contact of Developer._"
        );
      });
  }
});
client.on("message", (msg) => {
  if (msg.body == "/privacy") {
    msg.reply(privacynote);
  } else if (msg.body == "/team") {
    msg.reply(team);
  }
});
client.on("message", async (msg) => {
  if (msg.body === "/dev") {
    const contactId = "919526276014@c.us"; // The WhatsApp ID of the contact
    const contact = await client.getContactById(contactId);

    if (contact) {
      const vCard = `BEGIN:VCARD\nVERSION:3.0\nFN:${contact.pushname}\nTEL;TYPE=CELL:${contact.number}\nEND:VCARD`;
      await client.sendMessage(msg.from, vCard, {
        sendMediaAsSticker: false,
        mediaType: "vCard",
        quotedMsgId: null,
      });
      msg.reply("Contact card sent!");
    } else {
      msg.reply("Contact not found!");
    }
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
    msg.body === "/login" &&
    !state.awaitingUsername &&
    !state.awaitingPassword
  ) {
    try {
      const userName = await isloged(from);
      if (userName) {
        await msg.reply(
          `You are already logged in as ${userName}.🤗\nWant to change login credentials, Try "!signin".`
        );
        state.isloggedin = true;
      } else {
        state.awaitingUsername = true;
        await msg.reply(
          "Plz Note _We are getting attendance from EtLab, so we require userId and password of your EtLab and we are storing your data as encrypted only.😊_"
        );
        await msg.reply(
          "*Plz enter the EtLab userID.*(just enter the userid only '2*****')"
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
    await msg.reply(
      "*Plz enter the EtLab password.*(just enter the password only)"
    );
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
        `Hello ${user.name} (${user.department_id}) welcome to ChatET 😎.`
      );
      await client.sendMessage(
        msg.from,
        "User data saved successfully😊.\n(❗We recomment to delete the password message due to privacy concerns.)"
      );
    } catch (error) {
      await client.sendMessage(
        msg.from,
        "Sorry, Your userId or password is wrong!!😔"
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
        `Hello ${user.name} (${user.department_id}) welcome to ChatET😎`
      );
      await client.sendMessage(
        msg.from,
        "User data saved successfully.🤩\n(❗We recomment to delete the password message due to privacy concerns.)"
      );
    } catch (error) {
      await client.sendMessage(
        msg.from,
        "Sorry, Your userId or password is wrong!!😔 "
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
  if (msg.body === "/attendance" || msg.body === "/att") {
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
        let attendList = "_Subject wise attendance:-_\n";
        attend.forEach((attend, index) => {
          const subjectName = subjectNames[attend.subject] || attend.subject;
          attendList += `${index + 1}. ${subjectName} ->\n${
            attend.attendance
          }\n`;
        });
        let totalList = "_Total attendance:-_\n";
        total.forEach((total, index) => {
          totalList += `${total.subject}  ->  ${total.attendance}\n`;
        });
        await client.sendMessage(msg.from, attendList);
        await client.sendMessage(msg.from, totalList);
      } else {
        await msg.reply("Plz login to get attendance !😌");
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
  if (msg.body === "/notify-ab") {
    const from = msg.from;
    try {
      const userGet = await getUserData(from);
      if (userGet) {
        await msg.reply(
          `G’day! ${userGet.name} 🤗.\n_You have enabled Absent detection and Notification provider , you will be notified every day morning if you miss a class._`
        );
        const attendance = await fetchUserAttendance(
          userGet.userid,
          userGet.password
        );
        await saveAttendData(userGet.userid, from, attendance, true); //saving to db
      } else {
        await msg.reply("Plz login to enable it!😥");
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
  if (msg.body === "/stop-ab") {
    const from = msg.from;
    try {
      const userGet = await getUserData(from);
      if (userGet) {
        await msg.reply(
          `G’day! ${userGet.name} 🤗.\n_You have disabled Absent detection and Notification provider._`
        );
        const attendance = null;
        await saveAttendData(userGet.userid, from, attendance, false); //saving to db
      } else {
        await msg.reply("Plz login to enable it!😥");
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
  cron.schedule("30 09 * * *", async () => {
    try {
      const users = await getAllUserAttendance();
      for (const user of users) {
        try {
          const userGet = await getUserData(user.whid);
          if (userGet) {
            const todayAttendance = await fetchUserAttendance(
              userGet.userid,
              userGet.password
            );
            getAbsentSubjects(user.subjectData, todayAttendance)
              .then(async (absentSubjects) => {
                console.log("Absent subjects:", absentSubjects);
                const absent = absentSubjects.slice(0, -1);
                let absentList = `You (${user.username}) were absent on :- \n`;
                absent.forEach((absent, index) => {
                  absentList += `${index + 1}. ${absent}\n`;
                });
                absentList +=
                  "hours yesterday! plz contact subject teacher if you were present..\nCheck you current attendance at '!att'";
                await client.sendMessage(user.whid, absentList);
                console.log(`Message sent to ${user.username} (${user.whid})`);
              })
              .catch((error) => console.error("Error:", error));

            //await saveAttendData(userGet.userid, user.whid, todayAttendance); //saving to db
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
// When the client received QR-Code
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

// Start your client
client.initialize();
