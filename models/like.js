const mongoose = require("mongoose");
const likeSchema = mongoose.Schema({
  id_client: { type: mongoose.Types.ObjectId, ref: "Client" },
  id_artisan: { type: mongoose.Types.ObjectId, ref: "Artisan" },
  id_post: { type: mongoose.Types.ObjectId, ref: "Post" },
});
module.exports = mongoose.model("Like", likeSchema);
