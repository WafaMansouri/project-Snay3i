const mongoose = require("mongoose");
const interventionSchema = mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  id_client: { type: mongoose.Types.ObjectId, ref: "Client" },
  id_artisan: { type: mongoose.Types.ObjectId, ref: "Artisan" },
  msg_client: { type: String, required: true },
  msg_artisan: String,
  state: { type: String, required: true },
  start_date: Date,
  end_date: Date,
  start_date_artisan: Date,
  end_date_artisan: Date,
  date_artisan: String,
});
module.exports = mongoose.model("Intervention", interventionSchema);
