const { fetchtimetable } = require("../api/fetcher");
const { getUserData } = require("../db/userdb");

async function sendTimetable(client, msg, from, day) {
  try {
    const userGet = await getUserData(from);
    if (userGet) {
      await msg.reply(`G’day! ${userGet.name}🤗.\nLoading Timetable...`);
      const timetable = await fetchtimetable(userGet.userid, userGet.password);
      console.log(timetable);
      const daySchedule = timetable.find((d) => d.day === day);

      let timetableMessage = `*${day} Timetable*\n\n`;
      daySchedule.periods.forEach((period, index) => {
        timetableMessage += `${index + 1}. ${period}\n\n`;
      });

      await client.sendMessage(from, timetableMessage);
    } else {
      await msg.reply("Plz login to get Timetable !😌");
    }
  } catch (error) {
    console.error("Error fetching timetable", error);
    await client.sendMessage(
      msg.from,
      "Sorry, there was an error fetching your timetable"
    );
  }
}

async function timetable(client) {
  client.on("message", async (msg) => {
    if (msg.body === "/timetable" || /^(timetable)$/i.test(msg.body)) {
      const from = msg.from;
      await sendTimetable(client, msg, from, "Monday");
    }
  });
}

module.exports = { timetable };
