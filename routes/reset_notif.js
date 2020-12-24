const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const router = express.Router();
const Artisan = require("../models/artisan");
const Client = require("../models/client");

//Send Notification To the Client
router.post("/", authMiddleware, (req, res) => {
  if (req.state === "Client") {
    Client.findByIdAndUpdate(
      req.user_Id,
      { notification: 0 },
      { new: true, useFindAndModify: false }
    )
      .exec()
      .then((client) => {
        res.status(200).send("Notification Reset");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ errors: [{ msg: "Server Error!" }] });
      });
  } else if (req.state === "Artisan") {
    Artisan.findByIdAndUpdate(
      req.user_Id,
      { notification: 0 },
      { new: true, useFindAndModify: false }
    )
      .exec()
      .then((artisan) => {
        res.status(200).send("Notification Reset");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ errors: [{ msg: "Server Error!" }] });
      });
  }
});
module.exports = router;
