const mongoose = require("mongoose");
const artisanSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
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
  avatar: String,
  age: Number,
  description: String,
  rates: [{ type: mongoose.Types.ObjectId, ref: "Rate" }],
  notification: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Artisan", artisanSchema);
