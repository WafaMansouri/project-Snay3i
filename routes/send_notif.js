const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const router = express.Router();
const Artisan = require("../models/artisan");
const Client = require("../models/client");

//Send Notification
router.post("/", authMiddleware, (req, res) => {
  if (req.state === "Artisan") {
    Client.findByIdAndUpdate(
      req.body.id,
      { $inc: { notification: 1 } },
      { new: true, useFindAndModify: false }
    )
      .exec()
      .then((client) => {
        res.status(200).send("Notification sent to the client");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ errors: [{ msg: "Server Error!" }] });
      });
  } else if (req.state === "Client") {
    Artisan.findByIdAndUpdate(
      req.body.id,
      { $inc: { notification: 1 } },
      { new: true, useFindAndModify: false }
    )
      .exec()
      .then((artisan) => {
        res.status(200).send("Notification sent to the artisan");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ errors: [{ msg: "Server Error!" }] });
      });
  }
});
module.exports = router;
