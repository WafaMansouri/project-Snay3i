const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const router = express.Router();
const Artisan = require("../models/artisan");

// Search and visit profile by id
router.get("/:id", authMiddleware, (req, res) => {
  Artisan.findOne({ _id: req.params.id })
    .exec()
    .then((artisan) => {
      console.log(req.params.id);
      res.status(201).send(artisan);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});
module.exports = router;
