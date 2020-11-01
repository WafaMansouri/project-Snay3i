const mongoose = require("mongoose");
const artisanSchema = mongoose.Schema({
  f_name: { type: String, required: true },
  l_name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: { type: String, required: true },
  state: { type: String, default: "Artisan" },
  category: String,
  address: String,
  tel: Number,
  photo: {
    data: Buffer,
    contentType: String,
  },
  age: Number,
  description: String,
});

module.exports = mongoose.model("Artisan", artisanSchema);
