const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  email_address: { type: String, required: true, unique : true },
  name: { type: String, default: "" },
  password: { type: String, default: "" },
  profile_picture : { type: String, default : 'https://cdn.discordapp.com/attachments/955281529481883729/960149662831087626/morty.png'},
});


module.exports = mongoose.model("users", userSchema);
