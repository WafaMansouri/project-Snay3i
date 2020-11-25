const mongoose = require("mongoose");
const contactUsSchema = mongoose.Schema({
  f_name: String,
  l_name: String,
  email: String,
  mobile: Number,
  message: String,
});
module.exports = mongoose.model("ContactUs", contactUsSchema);
