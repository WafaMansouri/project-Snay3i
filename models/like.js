const mongoose = require("mongoose");
const likeSchema = mongoose.Schema({
  id_client: { type: mongoose.Types.ObjectId, ref: "Client", required: true },
  id_post: { type: mongoose.Types.ObjectId, ref: "Post", required: true },
});
module.exports = mongoose.model("Like", likeSchema);
