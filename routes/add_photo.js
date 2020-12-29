const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const router = express.Router();
const Artisan = require("../models/artisan");
const Client = require("../models/client");
const { body, validationResult } = require("express-validator");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `uploads/profile_photos`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

// add photo
router.post("/", authMiddleware, upload.single("avatar"), (req, res) => {
  let path = `${req.protocol}://${req.hostname}:${req.socket.localPort}/uploads/profile_photos/${req.file.filename}`;
  if (req.state === "Artisan") {
    Artisan.findByIdAndUpdate(
      req.user_Id,
      { avatar: path },
      { new: true, useFindAndModify: false } //to send the updated artisan
    )
      .then((artisan) => {
        res.status(200).send(artisan);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ errors: [{ msg: "Server Error!" }] });
      });
  } else if (req.state === "Client") {
    Client.findByIdAndUpdate(
      req.user_Id,
      { avatar: path },
      { new: true, useFindAndModify: false }
    )
      .then((client) => res.send(client))
      .catch((err) => {
        console.log(err);
        res.status(500).send({ errors: [{ msg: "Server Error!" }] });
      });
  }
});
module.exports = router;
