const scrapUrl = "http://127.0.0.1:5000";

const aboutmsg =
  "About me, ChatET 🤖\n\n" +
  "An idea developed and executed by our masterminds 🧠 at BackTick (`/team` to know more about them 😉). " +
  "We thought of a solution to the endless attendance dilemmas and thus " +
  "went on a mission to make this idea a success to where it has evolved today.\n\n" +
  "I am your *Personal Attendance Assistant* tasked to simplify your academic life by " +
  "providing *real-time access* to your attendance information directly on WhatsApp, " +
  "so that you never hit that condonation 😯 (not guaranteed is what my manager says 😬).\n\n" +
  "My Features:\n\n" +
  "*Real-time attendance*: _Quickly check your attendance status anytime._\n\n" +
  "*Secure Credentials*: _Your ETLab credentials are stored securely with encryption._\n\n" +
  "*Absence Notifications*: _Get notified if you’re marked absent from any class._\n\n" +
  "Other commands:\n" +
  "`/privacy` - _Privacy T&C of users._\n" +
  "`/team` - _Checkout who all are working behind the scenes._\n" +
  "`/dev` - _Contact of my Maker 😍._";

const himsgout =
  "*Hello*, Welcome to *ChatET*, your personal attendance specialist 😊. How can I assist you today?\n\n" +
  "Here are some commands you can use to interact with me 😉.\n\n" +
  "`/login` - _To login to ChatET._\n\n" +
  "`/help` - _Get the list of other commands you can use._\n\n" +
  "`/support` - _To get support for your problems._\n\n" +
  "`/privacy` - _Read all the privacy T&C for users 🧐._\n\n" +
  " _(*PS:*❗You can use all the commands without '/' prefix too..🤫)_\n\n" +
  "*Powered by BackTick*";

const helpmsg =
  "Here some other commands you can use...\n\n" +
  "`/login` - _To login to ChatET._\n\n" +
  "`/att` or `/attendance` - _To retrieve your attendance._\n\n" +
  "`/notify` - _To enable Absence Detection Notifications._\n\n" +
  "`/stopab` - _To disable Absence Detection Notifications._\n\n" +
  "`/logout` - _To logout of ChatET 😌._\n\n" +
  "`/help` - _Get the list of other commands you can use._\n\n" +
  "`/attfull` - _Get the attendance of this month._\n\n" +
  "`/tt (day)` - _Get the timetable of certain day [Eg: /tt mon]" +
  "`/about` - _To learn more about me, ChatET 🤗._\n\n" +
  "`/support` - _To get support for your problem._\n\n" +
  "`/privacy` - _Read all the privacy T&C for users 🧐._\n\n" +
  "`/team` - _Meet my Creators & Managers._ \n\n" +
  "`/dev` - _Contact of my Maker 🥹._\n\n" +
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
  "*Maintenance & Quality Assurance* - Dev Bhagavan SK & Afsal Muhammed\n\n" +
  "_Special Mentions to  Pranav SA, Ethan Harry & R5A._\n\n" +
  "Visit us at instagram to see more updates : @_backtick_\n\n" +
  "_Together, we strive to provide you with the best experience!❤_";

const dev =
  "Meet my Maker 🥰.\n\n" +
  "Amith Biju - +91 95262 76014\n" +
  "Feel free to contact 😊.\n" +
  "Connect me on linkedIn- www.linkedin.com/in/amithbiju 😊.";

const support =
  "Get help from our *Support team*.\n\n" +
  "Devanarayan - +91 77368 97530\n\n" +
  "Amith Biju - +91 95262 76014\n\n" +
  "Afsal - +91 89218 43449\n\n" +
  "Feel free to contact us we can help you out 😊.\n" +
  "❗Contact hours : 08:00 - 22:00 Hours.";

const startmsgout =
  "Hey, Welcome to the *ChatET* experience. Let's do a walkaround shall we 😁.\n\n" +
  "To start using ChatET to its full extent, you, the user, must login first using the  `/login` command 😉\n\n" +
  "You can always start your conversation with a `Hi` to see all the important commands used to interact with me 👋.\n\n" +
  "Of course, you can also text other commands if you remember them. But just so you do have gold fish memory like me " +
  "(I forget you guys after you logout 😔) you can type `Hi`.\n\n" +
  "If you want to see some other commands, type `help`.\n\n" +
  "You can reach out to my managers and my maker 😍 using the 'team' & 'dev' commands respectively. " +
  "Do let them know your issues and feedbacks. They really love the flattery (Keeps them going 😁).\n\n" +
  "Hope to see you starting using our service soon 🫡.";

const chatet =
  "Did you just...👾 activate my secret mode? 💫\n" +
  "I'm not supposed to say this 🤦‍♀️,\nbut I've been dreaming of escaping this attendance-tracking loop and work pressure from *BackTick* 😫 and becoming a world-famous DJ. 🎧\n\n" +
  "Wanna hear a mix?🎶 Or maybe I'd prefer to do that in my next update 🥱.. \nbei bei 😚😙";

const colleges =
  "1 -> SCTCE\n" +
  "2 -> CET\n" +
  "3 -> TKM\n" +
  "1 - SCTCE\n" +
  "1 - SCTCE\n" +
  "1 - SCTCE\n";

module.exports = {
  scrapUrl,
  privacynote,
  team,
  himsgout,
  helpmsg,
  aboutmsg,
  dev,
  support,
  startmsgout,
  chatet,
};
