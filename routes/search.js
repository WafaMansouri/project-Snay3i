const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const router = express.Router();
const Artisan = require("../models/artisan");

// Create post
router.get("/:name", authMiddleware, (req, res) => {
  let arr = req.params.name.split(" ");
  let f_name = arr[0];
  let l_name = arr[1];
  Artisan.find({ f_name, l_name })
    .exec()
    .then((artisan) => {
      res.status(201).send(artisan);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});

module.exports = router;
