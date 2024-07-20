const express = require("express");
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const mongoose = require("mongoose");
const { fetchUserData } = require("./api/fetcher");

const { saveUserData } = require("./db/userdb");
const { isloged } = require("./db/loged");

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

console.log;

// When the client received QR-Code
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

// Start your client
client.initialize();
