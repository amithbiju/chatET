const scrapUrl = "http://127.0.0.1:5000";

const aboutmsg = 
  "About me, ChatET 🤖\n\n" +
  "An idea developed and executed by our mastermind 🧠 Developer Amith Biju. " +
  "Amith together with his team of passionate colleagues from Backtick (`/team` to know more about them 😉) " +
  "went on a mission to make this idea a success to where it has evolved today.\n\n" +
  "I am your personal Attendance assistant tasked to simplify your academic life by " +
  "providing real-time access to your attendance information directly on WhatsApp, " +
  "so that you never hit that condonation 😯 (not guaranteed is what my manager says 😬)\n\n." +
  "My Features:\n\n" +
  "*Real-time attendance*: Quickly check your attendance status anytime.\n\n" + 
  "*Secure Credentials*: Your ETLab credentials are stored securely with encryption.\n\n" +
  "*Absence Notifications*: Get notified if you’re marked absent from any class.\n\n" +
  "Other commands:\n" +
  "`/privacy` - Privacy T&C of users.\n" +
  "`/team` - Checkout who all are working behind the scenes.\n" +
  "`/dev` - Contact of my Maker 😍.";

const himsgout =
  "*Hello!!!* Welcome to *ChatET*, your personal attendance specialist 😊. How can I assist you today?\n\n" +
  "Here are some commands you can use to interact with me 😉." +
  "`/login` - _To login to ChatET._\n\n" +
  "`/help` - _Get the list of other commands you can use._\n\n" +
  "`/support` - _To get support for your problems._\n\n" +
  "`/privacy` - _Read all the privacy T&C for users 🧐._\n\n" +
  " _(*PS:*❗You can use all the commands without '/' prefix too..🤫)_\n\n" +
  "*Powered by BackTick*";

const helpmsg =
  "Here some other commands you can use...\n\n" +
  "`/about` - _To learn more about me, ChatET 🤗._\n\n" +
  "`/support` - _To get support for your problem._\n\n" +
  "`/privacy` - _Read all the privacy T&C for users 🧐._\n\n" +
  "`/team` - _Meet my Creators & Managers._ \n\n" +
  "`/dev` - _Contact of my Maker 🥹._" +
  " _(*PS:*❗You can use all the commands without '/' prefix too..🤫)_\n\n" +
  "*Powered by BackTick*";

const privacynote =
  "Privacy Note⭕\n\n" +
  "At ChatET, your privacy and security are our top priorities. We are committed to protecting your personal information and ensuring that your data is handled with the utmost care.\n\n" +
  "*Data Encryption:*\n" +
  "- Your ETLab credentials are stored securely and encrypted to prevent unauthorized access.\n\n" +
  "*Data Usage:*\n" +
  "- Your credentials and attendance information are used solely to provide you with attendance updates and notifications.\n" +
  "- We do not share your personal information with any third parties.\n\n" +
  "*Notifications:*\n" +
  "- You can choose to enable or disable absence notifications at any time using the commands `/notify` and `/stopab`, respectively.\n\n" +
  "*User Control:*\n" +
  "- You have full control over your data and can update or delete your credentials at any time using the command `/logout`.\n\n" +
  "*Security Measures:*\n" +
  "- We employ industry-standard security measures to protect your data from breaches and unauthorized access.\n\n" +
  "*Contact Us:*\n" +
  "- If you have any questions or concerns about your privacy, please contact our support team using the command `/support`.\n\n" +
  "By using ChatET, you agree to our privacy practices as outlined in this note. We are committed to maintaining your trust and protecting your privacy.\n\n" +
  "`/team` - _The whole team of ChatET._\n\n`/dev` - _Contact of Developer._";

const team =
  "Meet our *team BackTick*!!!\n" +
  "*The masterminds behind ChatET ✌*\n\n" +
  "*Development* - Amith Biju\n" +
  "*Media* - Abhijith PV & Hrishikesh VR\n" +
  "*WhatsApp Manager & Content* - Devanarayan S\n" +
  "*Maintenance & Quality Assurance* - Dev Bhagavan SK & Afsal Muhammed\n" +
  "*Special Mentions* - Pranav SA, Ethan Harry.\n\n" +
  "Visit us at instagram to see more updates : @_backtick_\n" +
  "_Together, we strive to provide you with the best experience!❤_";

module.exports = { scrapUrl, privacynote, team, himsgout, helpmsg };
