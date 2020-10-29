const mongoose = require("mongoose");
const interventionSchema = mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  id_client: { type: String, ref: "Client" },
  id_artisan: { type: String, ref: "Artisan" },
  msg_client: { type: String, required: true },
  state: { type: String, required: true },
});
module.exports = mongoose.model("Intervention", interventionSchema);
