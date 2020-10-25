const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  title: String,
  description: { type: String, required: true },
  photo: Array(String),
  created_at: { type: Date, default: Date.now },
  id_owner: { type: mongoose.Types.ObjectId, ref: "Artisan" },
});
module.exports = mongoose.model("Post", postSchema);
