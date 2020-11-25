const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const router = express.Router();
const Artisan = require("../models/artisan");
const Rate = require("../models/rate");

// Search list artisans by name
router.get("/name/:name", (req, res) => {
  let whiteSpace = req.params.name.search(" ");
  if (whiteSpace > -1) {
    let arr = req.params.name.split(" ");
    let f_name = arr[0];
    let l_name = arr[1];
    Artisan.find({
      $or: [
        { f_name: { $regex: f_name, $options: "i" } },
        { l_name: { $regex: l_name, $options: "i" } },
      ],
    })
      .populate("rates")
      .exec()
      .then((artisans) => {
        res.status(201).send(artisans);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ errors: [{ msg: "Server Error!" }] });
      });
  } else
    Artisan.find({
      $or: [
        { f_name: { $regex: req.params.name, $options: "i" } },
        { l_name: { $regex: req.params.name, $options: "i" } },
      ],
    })
      .populate("rates")
      .exec()
      .then((artisans) => {
        res.status(201).send(artisans);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ errors: [{ msg: "Server Error!" }] });
      });
});

// Search list artisans by category
router.get("/category/:category", (req, res) => {
  Artisan.find({ category: { $regex: req.params.category, $options: "i" } })
    .populate("rates")
    .exec()
    .then((artisans) => {
      res.status(201).send(artisans);
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
