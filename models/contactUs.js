const mongoose = require("mongoose");
const contactUsSchema = mongoose.Schema({
  f_name: String,
  l_name: String,
  email: String,
  mobile: Number,
  message: String,
  created_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model("ContactUs", contactUsSchema);
