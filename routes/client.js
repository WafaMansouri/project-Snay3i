const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const Intervention = require("../models/intervention");
const router = express.Router();
//get client requests
router.get("/requests", authMiddleware, (req, res) => {
  Intervention.find({ id_client: req.user_Id })
    .populate("id_artisan")
    .exec()
    .then((interventions) => {
      res.status(200).send(interventions);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});

module.exports = router;
