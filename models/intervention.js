const mongoose = require("mongoose");
const interventionSchema = mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  id_client: { type: mongoose.Types.ObjectId, ref: "Client" },
  id_artisan: { type: mongoose.Types.ObjectId, ref: "Artisan" },
  msg_client: { type: String, required: true },
  msg_artisan: String,
  state: { type: String, required: true },
});
module.exports = mongoose.model("Intervention", interventionSchema);
