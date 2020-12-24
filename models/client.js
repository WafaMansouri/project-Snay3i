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
  notification: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Client", clientSchema);
