const { fetchUserData } = require("../api/fetcher");
const { saveUserData } = require("../db/userdb");
const { isloged } = require("../db/loged");
const { saveAttendData } = require("../db/attenddb");
const { expectInput } = require("./notsupport");

async function login(client) {
  let loginStates = {};
  client.on("message", async (msg) => {
    const from = msg.from;

    if (!loginStates[from]) {
      loginStates[from] = {
        awaitingUsername: false,
        awaitingPassword: false,
        awaitingClg: false,
        isloggedin: false,
        currentUserId: "",
        currentPassword: "",
        currentClg: "",
      };
    }

    const state = loginStates[from];

    if (
      (msg.body === "/login" || /^(login)$/i.test(msg.body)) &&
      !state.awaitingUsername &&
      !state.awaitingPassword &&
      !state.awaitingClg
    ) {
      try {
        const userName = await isloged(from);
        if (userName) {
          await msg.reply(
            `You are already logged in as *${userName}*.\n No need of logging in again 😉.\n\nWant to try */chguser* ?\n_This command allows you to automatically logout from your current user and prompt you to login to another account._`
          );
          state.isloggedin = true;
        } else {
          state.awaitingUsername = true;
          await msg.reply(
            "❗Please note that we are sourcing your attendance from ETLab and therefore we require your *UserID and Password*. " +
              "Don't worry *your credentials are encrypted* 😌."
          );
          await msg.reply(
            "Please enter your *ETLab UserID*.\n" +
              "_(PS: ❗It is your College Admission Number `******`)_"
          );
          expectInput(from);
          //setTimeout(resetState, 300000); // Reset state after 5 minutes
        }
      } catch (error) {
        console.error("Error during login check:", error);
        await msg.reply("There was an error checking your login status.");
      }
    } else if (
      state.awaitingUsername &&
      from === msg.from &&
      !state.isloggedin
    ) {
      state.currentUserId = msg.body;
      state.awaitingUsername = false;
      state.awaitingPassword = true;
      await msg.reply("Please enter your *ETLab password*.");
      expectInput(from);
      //setTimeout(resetState, 300000); // Reset state after 5 minutes
    } else if (
      // college SELECTION
      state.awaitingPassword &&
      from === msg.from &&
      !state.isloggedin
    ) {
      state.currentPassword = msg.body;
      state.awaitingPassword = false;
      state.awaitingClg = true;
      await msg.reply("Please enter your *College*.");
      expectInput(from);
      //setTimeout(resetState, 300000); // Reset state after 5 minutes
    } else if (state.awaitingClg && from === msg.from && !state.isloggedin) {
      state.currentClg = msg.body;
      await client.sendMessage(
        msg.from,
        "Please wait.. validating credentials🧐"
      );
      state.awaitingClg = false;
      state.isloggedin = false;

      //validation
      const userId = state.currentUserId;

      // Validation to check if the username starts with 'P'
      if (userId.startsWith("P")) {
        await client.sendMessage(
          msg.from,
          "Invalid UserID 😔.\nPlease enter a valid Student UserID !!"
        );
      } else {
        // Fetch user data from API
        try {
          const user = await fetchUserData(
            state.currentUserId,
            state.currentPassword
          );
          console.log(from);
          await saveUserData(
            user.user_data,
            from,
            state.currentPassword,
            "SCTCE"
          ); //saving to db
          await saveAttendData(
            user.user_data.username,
            from,
            user.subject_data,
            true
          ); //saving to db
          await client.sendMessage(
            msg.from,
            `Hello *${user.user_data.name}* (${user.user_data.department_id}) 💫,\nWelcome to *ChatET* 😎.\nYou can start exploring by literally texting 'start' 😯.\n\n❗Note : Absence Detection Notification enabled by default.`
          );
          await client.sendMessage(
            msg.from,
            "❗ We recommend you to *'Delete for Everyone'* your password message due to privacy concerns. " +
              "This is an important step. To know more about your privacy, type `/privacy`. (Advice you to start with 'start')"
          );
        } catch (error) {
          await client.sendMessage(
            msg.from,
            "Login failed 😔!!!\nPlease check your *UserID and Password* & try again using the `/login` command."
          );
        }
      }
      console.log(state.currentUserId);
      console.log(state.currentPassword);

      // Reset state
      state.currentUserId = "";
      state.currentPassword = "";
    }
    state.isloggedin = false; //to make login state false even if user was login and then logeg out !very imp
  });

  //Change User
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
      await msg.reply("Please enter your *ETLab UserID*.");
      expectInput(from);
    } else if (state.awaitingUsername && from === msg.from) {
      state.currentUserId = msg.body;
      state.awaitingUsername = false;
      state.awaitingPassword = true;
      await msg.reply("Please enter your *ETLab password*.");
      expectInput(from);
    } else if (state.awaitingPassword && from === msg.from) {
      await client.sendMessage(
        msg.from,
        "Please wait.. validating credentials🧐"
      );
      state.currentPassword = msg.body;
      state.awaitingPassword = false;

      // Fetch user data from API
      try {
        const user = await fetchUserData(
          state.currentUserId,
          state.currentPassword
        );
        console.log(from);
        await saveUserData(
          user.user_data,
          from,
          state.currentPassword,
          "SCTCE"
        ); //saving to db
        await saveAttendData(
          user.user_data.username,
          from,
          user.subject_data,
          true
        ); //saving to db
        await client.sendMessage(
          msg.from,
          `Hello *${user.user_data.name}* (${user.user_data.department_id})💫,\nWelcome to *ChatET* 😎.\n\n❗Note : Absence Detection Notification enabled by default`
        );
        await client.sendMessage(
          msg.from,
          "❗We recommend you to *'Delete for Everyone'* your password message due to privacy concerns.\n " +
            "This is an important step. To know more about your privacy, type `/privacy`."
        );
      } catch (error) {
        await client.sendMessage(
          msg.from,
          "Login failed 😔!!!\nPlease check your UserID and Password & try again using the `/chguser` command"
        );
      }
      console.log(state.currentUserId);
      console.log(state.currentPassword);

      // Reset state
      state.currentUserId = "";
      state.currentPassword = "";
    }
  });
}

module.exports = { login };
