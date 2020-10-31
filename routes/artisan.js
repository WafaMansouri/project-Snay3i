const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const Intervention = require("../models/intervention");
const router = express.Router();
//get artisan requests
router.get("/requests", authMiddleware, (req, res) => {
  Intervention.find({ id_artisan: req.user_Id })
    .populate("id_client")
    .exec()
    .then((interventions) => {
      res.status(200).send(interventions);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});
//post response
router.post("/response", authMiddleware, (req, res) => {
  Intervention.findOneAndUpdate(
    { id_artisan: req.user_Id, id_client: req.body.id_client },
    { msg_artisan: req.body.msg_artisan, state: "Respond Artisan" },
    { new: true, useFindAndModify: false }
  )
    .exec()
    .then((intervention) => {
      res.status(200).send(intervention);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});
module.exports = router;
