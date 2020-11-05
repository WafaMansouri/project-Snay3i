const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const router = express.Router();
const Artisan = require("../models/artisan");
const Client = require("../models/client");
const { body, validationResult } = require("express-validator");
// Update Info
router.post(
  "/",
  authMiddleware,
  [
    body("f_name", "First name must only consist of alphabetic").isAlpha(),
    body("l_name", "Last name must only consist of alphabetic").isAlpha(),
    body("email", "please enter a valid email").isEmail(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    } else {
      if (req.state === "Artisan") {
        Artisan.findByIdAndUpdate(req.user_Id, req.body, {
          new: true,
          useFindAndModify: false,
        })
          .then((artisan) => {
            res.status(200).send(artisan);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({ errors: [{ msg: "Server Error!" }] });
          });
      } else if (req.state === "Client") {
        Client.findByIdAndUpdate(req.user_Id, req.body, {
          new: true,
          useFindAndModify: false,
        })
          .then((client) => {
            res.status(200).send(client);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({ errors: [{ msg: "Server Error!" }] });
          });
      }
    }
  }
);

module.exports = router;
