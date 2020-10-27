const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const router = express.Router();
const Artisan = require("../models/artisan");

// Search list artisans by name
router.get("/:name", authMiddleware, (req, res) => {
  let arr = req.params.name.split(" ");
  let f_name = arr[0];
  let l_name = arr[1];
  Artisan.find({ $or: [{ f_name: f_name }, { l_name: l_name }] })
    .exec()
    .then((artisan) => {
      res.status(201).send(artisan);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});

// Search and visit profile by id
router.get("/id/:id", authMiddleware, (req, res) => {
  Artisan.findById({ id: req.params.id })
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
