const { fetchUserAttendanceImage } = require("../api/fetcher");
const { getUserData } = require("../db/userdb");

async function attFull(client, MessageMedia) {
  client.on("message", async (msg) => {
    if (/^\/?attfull$/i.test(msg.body) || /^\/?att full$/i.test(msg.body)) {
      const from = msg.from;
      console.log("test");

      const today = new Date();
      let month = today.getMonth() + 1;

      try {
        const userGet = await getUserData(from);
        if (userGet) {
          await msg.reply(
            `G’day! ${userGet.name}🤗.\nProcessing attendance image, This may take few seconds...`
          );
          const imageBase64 = await fetchUserAttendanceImage(
            userGet.userid,
            userGet.password
          );
          //console.log(imageBase64);
          const media = new MessageMedia(
            "image/png",
            imageBase64,
            "attendance.png"
          );

          // Send the image as a WhatsApp message
          await client
            .sendMessage(msg.from, media, {
              caption: "Here is your attendance of the month.",
            })
            .then(() => {
              console.log("test23");
            });
        } else {
          await msg.reply(
            "Please login to get your attendance !😌. Use `/login`"
          );
        }
      } catch (error) {
        console.error("Error fetching attendance", error);
        await client.sendMessage(
          msg.from,
          "Sorry, an error has occured in retrieving your attendance image. Please try again later. If this issue persists, please contact `/support`."
        );
      }
    }
  });
}
module.exports = { attFull };
