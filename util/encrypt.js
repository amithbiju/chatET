const Cryptr = require("cryptr");
const cryptr = new Cryptr("Sadanamkayyilunde", {
  encoding: "base64",
  pbkdf2Iterations: 10000,
  saltLength: 10,
});

//const decryptedString = cryptr.decrypt(encryptedString);

function encryptPass(password) {
  const encryptedString = cryptr.encrypt(password);
  return encryptedString;
}

module.exports = { encryptPass };
