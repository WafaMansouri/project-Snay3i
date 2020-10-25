const express = require("express");
const router = express.Router();
const Category = require("../models/category");
// Retrieve categories
router.get("/", (req, res) => {
  Category.find()
    .exec()
    .then((categories) => {
      res.status(201).send(categories);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});
module.exports = router;
