function hi_msg_in(username) {
  return (
    `Greetings ${username} 😊. How can I assist you today?\n` +
    "You can use these commands to interact with me 😉.\n\n" +
    "`/att` or `/attendance` - _To retrieve your attendance._\n\n" +
    "`/notify` - _To enable Absence Detection Notifications._\n\n" +
    "`/stopab` - _To disable Absence Detection Notifications._\n\n" +
    "`/help` - _Get the list of other commands you can use._\n\n" +
    "`/support` - _To get support for your problems._\n\n" +
    "`/logout` - _To logout of ChatET 😌._\n\n" +
    "_(*PS*:❗You can use all the commands without '/' prefix too..🤫)_"
  );
}

function start_msg_in(username) {
  return (
    `Hey ${username}, Welcome to the ChatET experience. Let's do a walkaround shall we 😁.\n\n` +
    "You can always start your conversation with a `Hi` to see all the important commands used to interact with me 👋.\n\n" +
    "Of course, you can also text other commands if you remember them." +
    "But just so you do have gold fish memory like me (I forget you guys after you logout 😔) you can type `Hi`.\n\n" +
    "If you want to see some other commands, type `/help`.\n\n" +
    "You can reach out to my managers and my maker ❤️ using the 'team' & 'dev' commands respectively." +
    "Do let them know your issues and feedbacks. They really love the flattery (Keeps them going 😁)." +
    "Glad to have you on board 🫡."
  );
}

module.exports = { hi_msg_in, start_msg_in };
