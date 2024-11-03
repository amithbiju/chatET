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
  himsgout,
  dev,
  chatet,
} = require("./constants/constants");
const { hi_msg_in, start_msg_in } = require("./constants/message");
const { subjectNames } = require("./constants/subjectname");
const { notsupport } = require("./messages/notsupport");
const { login } = require("./messages/login");
const { attFull } = require("./messages/attfull");

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
  } else if (msg.body == "/chatet" || /^(chatet)$/i.test(msg.body)) {
    msg.reply(chatet);
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
//let loginStates = {}; // Track login state for each user
login(client);

//Logout
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
          `Hey ${userGet.name}😊, signing out will stop _Absence Detection Notification_ \nWould you like to continue? *Y or N*`
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
          `*Logged Out* successfully!!😌 \nIt was a pleasure to have you on board, ${userGet.name}😊`
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
    /^(att)$/i.test(msg.body) ||
    /^(attendance)$/i.test(msg.body)
  ) {
    const from = msg.from;
    try {
      const userGet = await getUserData(from);
      if (userGet) {
        await msg.reply(
          `G’day! ${userGet.name}🤗.\nLoading your attendance...`
        );
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
        "Sorry, an error has occured in retrieving your attendance. Please try again later. If this issue persists, please contact `/support`."
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
      console.error("Error fetching notification status", error);
      await client.sendMessage(
        msg.from,
        "Sorry, there was an error fetching your notification status"
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
      console.error("Error fetching notification status", error);
      await client.sendMessage(
        msg.from,
        "Sorry, there was an error fetching your notification status"
      );
    }
  }
});

client.on("ready", async () => {
  cron.schedule("30 02 * * *", async () => {
    var userCounter = 0;
    var sentCounter = 0;
    try {
      const users = await getAllUserAttendance();
      for (const user of users) {
        try {
          console.log(user);
          userCounter++;
          const userGet = await getUserData(user.whid);
          if (userGet) {
            const todayAttendance = await fetchUserAttendance(
              userGet.userid,
              userGet.password
            );
            getAbsentSubjects(user.subjectData, todayAttendance)
              .then(async (absentSubjects) => {
                if (absentSubjects) {
                  sentCounter++;
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
      client.sendMessage(
        "918921843449@c.us",
        `*Notification System Report*\nChecked users :- ${userCounter}\nNotifiactionSent users :- ${sentCounter}`
      ); //senting message to afsal
    } catch (error) {
      console.error("Error sending messages:", error);
    }
  });
});

timetable(client);
notsupport(client); // unwanted messages here
attFull(client, MessageMedia);

// When the client received QR-Code
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

// Start your client
client.initialize();
