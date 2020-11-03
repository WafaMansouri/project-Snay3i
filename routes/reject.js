const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const Intervention = require("../models/intervention");
const { body, validationResult } = require("express-validator");

const router = express.Router();
//reject request
router.post(
  "/",
  authMiddleware,
  [body("id_request", "id required").notEmpty()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Intervention.findByIdAndUpdate(
        req.body.id_request,
        { state: "Rejected" },
        { new: true, useFindAndModify: false }
      )
        .exec()
        .then((intervention) => {
          res.status(200).send(intervention);
          //   console.log(intervention);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ errors: [{ msg: "Server Error!" }] });
        });
    }
  }
);
module.exports = router;
