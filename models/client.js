const mongoose = require("mongoose");
const clientSchema = mongoose.Schema({
  f_name: { type: String, required: true },
  l_name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  address: String,
  tel: Number,
  avatar: String,
  age: Number,
  state: { type: String, default: "Client" },
});
module.exports = mongoose.model("Client", clientSchema);
