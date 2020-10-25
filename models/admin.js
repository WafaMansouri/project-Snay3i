const mongoose = require("mongoose");
const adminSchema = mongoose.Schema({
  f_name: { type: String, required: true },
  l_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: String,
  tel: Number,
  photo: Array(String),
  age: Number,
});
module.exports = mongoose.model("Admin", adminSchema);
