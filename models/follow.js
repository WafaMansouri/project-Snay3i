const mongoose = require("mongoose");
const followSchema = mongoose.Schema({
  id_client: { type: mongoose.Types.ObjectId, ref: "Client", required: true },
  id_artisan: { type: mongoose.Types.ObjectId, ref: "Artisan", required: true },
});
module.exports = mongoose.model("Follow", followSchema);
