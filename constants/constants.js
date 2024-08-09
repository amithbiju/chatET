const scrapUrl = "http://127.0.0.1:5000";

const himsgin =
  /*"Greetings 'user' 😊. How can I assist you today?"
You can use these commands to interact with me :winking face:.

/att or /attendance - To retrieve your attendance.

/notify - To enable Absence Detection Notifications.

/stopab - To disable Absence Detection Notifications.

/help - Get the list of other commands you can use.

/support - To get support for your problems.

/logout - To logout of ChatET :satisfied emoji:.

(PS:❗You can use all the commands without '/' prefix too.. :shush:)*/

const himsgout = 
  "Hello!!! Welcome to ChatET, your personal attendance specialist 😊. How can I assist you today?\n\n" +
  "Here are some commands you can use to interact with me 😉." +
  "/login - To login to ChatET.\n\n" +
  "/help - Get the list of other commands you can use.\n\n" +
  "/support - To get support for your problems.\n\n" +
  "/privacy - Read all the privacy T&C for users 🧐.\n\n" +
  " _(*PS:*❗You can use all the commands without '/' prefix too..🤫)_\n\n" +
  "*Powered by BackTick*";

const helpmsg =
  "Here are the commands you can use:✅\n\n" +
  "*/start* - Start interacting with the bot\n\n" +
  "*/help* - Get a list of commands\n\n" +
  "*/login* - To Login with ETLAB\n\n" +
  "*/attendance* or */att* - Get your current attendance\n\n" +
  "*/notify-ab* - Enable absence notifications\n\n" +
  "*/stop-ab* - Disable absence notifications\n\n" +
  "*/signout* - To signout of ChatET\n\n" +
  "*/about* - Learn more about ChatET \n\n" +
  "*/support* - Get support for your problem \n\n" +
  "Other commands:\n" +
  "*/privacy* - _Privacy and terms&conditions for users._\n" +
  "*/team* - _The whole team behind ChatET._\n" +
  "*/dev* - _Contact of Developer._\n\n" +
  "_(❗You can use all the commands without '/' prefix too..)_";
const privacynote =
  "Privacy Note⭕\n\n" +
  "At ChatET, your privacy and security are our top priorities. We are committed to protecting your personal information and ensuring that your data is handled with the utmost care.\n\n" +
  "*Data Encryption:*\n" +
  "- Your ETLab credentials are stored securely and encrypted to prevent unauthorized access.\n\n" +
  "*Data Usage:*\n" +
  "- Your credentials and attendance information are used solely to provide you with attendance updates and notifications.\n" +
  "- We do not share your personal information with any third parties.\n\n" +
  "*Notifications:*\n" +
  "- You can choose to enable or disable absence notifications at any time using the commands `/notify-ab` and `/stop-ab`.\n\n" +
  "*User Control:*\n" +
  "- You have full control over your data and can update or delete your credentials at any time using the command `/signin`.\n\n" +
  "*Security Measures:*\n" +
  "- We employ industry-standard security measures to protect your data from breaches and unauthorized access.\n\n" +
  "*Contact Us:*\n" +
  "- If you have any questions or concerns about your privacy, please contact our support team using the command `/support`.\n\n" +
  "By using ChatET, you agree to our privacy practices as outlined in this note. We are committed to maintaining your trust and protecting your privacy.\n\n" +
  "*/team* - _The whole team of ChatET._\n*/dev* - _Contact of Developer._";

const team =
  "*Our Team*\n\n" +
  "Meet the minds behind ChatET✌\n\n" +
  "*Amith Biju* - _Development_\n" +
  "*Abhijith PV* & *Hrishikesh* - _Designers_\n" +
  "*Devanarayan* - _WhatsApp Management_\n" +
  "*Pranav SA* & *Afsal Muhammed* - _Quality Assurance_\n\n" +
  "Together, we strive to provide you with the best experience!❤";

module.exports = { scrapUrl, privacynote, team, welcomemsg, helpmsg };
