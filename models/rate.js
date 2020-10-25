const mongoose = require("mongoose");
const rateSchema = mongoose.Schema({
  id_client: { type: mongoose.Types.ObjectId, ref: "Client", required: true },
  id_artisan: { type: mongoose.Types.ObjectId, ref: "Artisan", required: true },
  value: { type: Number, required: true },
});
module.exports = mongoose.model("Rate", rateSchema);
