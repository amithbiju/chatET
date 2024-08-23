const userStates = {};

async function notsupport(client) {
  client.on("message", async (msg) => {
    const userState = userStates[msg.from];

    if (userState === "expectingInput") {
      userStates[msg.from] = null;
      return;
    }
    if (
      //basic message
      !/^(hi|hello)$/i.test(msg.body) &&
      !/^\/?help$/i.test(msg.body) &&
      !/^\/?about$/i.test(msg.body) &&
      !/^\/?start$/i.test(msg.body) &&
      !/^\/?support$/i.test(msg.body) &&
      !/^\/?dev$/i.test(msg.body) &&
      !/^\/?team$/i.test(msg.body) &&
      !/^\/?privacy$/i.test(msg.body) &&
      //util message
      !/^\/?login$/i.test(msg.body) &&
      !/^\/?chguser$/i.test(msg.body) &&
      !/^\/?logout$/i.test(msg.body) &&
      !/^\/?attendance$/i.test(msg.body) &&
      !/^\/?att$/i.test(msg.body) &&
      !/^\/?notify$/i.test(msg.body) &&
      !/^\/?stopab$/i.test(msg.body) &&
      //time table mssg
      !/^\/?tt mon$/i.test(msg.body) &&
      !/^\/?tt tue$/i.test(msg.body) &&
      !/^\/?tt thu$/i.test(msg.body) &&
      !/^\/?tt wed$/i.test(msg.body) &&
      !/^\/?tt fri$/i.test(msg.body) &&
      !/^\/?tt sat$/i.test(msg.body) &&
      //util
      !/^\/?y$/i.test(msg.body) &&
      !/^\/?n$/i.test(msg.body) &&
      !/^\/?full$/i.test(msg.body) &&
      !/^\/?chatet$/i.test(msg.body)
    ) {
      msg.reply(
        "*Command not supported !!*\n use `help` to get list of commands👽"
      );
    }
  });
}

function expectInput(userId) {
  userStates[userId] = "expectingInput";
}

module.exports = { notsupport, expectInput };
