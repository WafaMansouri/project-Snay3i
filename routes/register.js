const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Client = require("../models/client");
const Artisan = require("../models/artisan");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
router.post(
  "/",
  [
    body("f_name", "Your first name must only consist of alphabetic").isAlpha(),
    body("l_name", "Your last name must only consist of alphabetic").isAlpha(),
    body("email", "please enter a valid email").isEmail(),
    body("password", "Your password must have 5 characters at least").isLength({
      min: 5,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      if (req.body.state === "Client") {
        //Register Client
        // verify if the email already exists
        Client.find({ email: req.body.email })
          .exec()
          .then((client) => {
            if (client.length) {
              return res
                .status(400)
                .send({ errors: [{ msg: "Email already exists" }] });
            }
            //if not exist create client
            let newClient = new Client(req.body);
            //bcrypt password
            bcrypt.genSalt(10, function (err, salt) {
              if (err) throw err;
              bcrypt.hash(req.body.password, salt, function (err, hashedpw) {
                if (err) throw err;
                // Store hash in DB.
                newClient.password = hashedpw;
                newClient.save();
              });
            });
            let payload = {
              user_Id: newClient._id,
              first_name: newClient.f_name,
              last_name: newClient.l_name,
              email: newClient.email,
              state: "Client",
            };
            jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
              if (err) throw err;
              res.send({ token });
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({ errors: [{ msg: "Server Error!" }] });
          });
      }

      //Register Artisan
      else {
        Artisan.find({ email: req.body.email })
          .then((artisan) => {
            if (artisan.length) {
              return res
                .status(400)
                .send({ errors: [{ msg: "Email already exists" }] });
            }
            //if not exist create artisan
            let newArtisan = new Artisan(req.body);
            //bcrypt password
            bcrypt.genSalt(10, function (err, salt) {
              if (err) throw err;
              bcrypt.hash(req.body.password, salt, function (err, hashedpw) {
                if (err) throw err;
                // Store hash in DB.
                newArtisan.password = hashedpw;
                newArtisan.save();
                let payload = {
                  user_Id: newArtisan._id,
                  first_name: newArtisan.f_name,
                  last_name: newArtisan.l_name,
                  email: newArtisan.email,
                  category: newArtisan.category,
                  state: "Artisan",
                };
                jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
                  if (err) throw err;
                  res.send({ token });
                });
              });
            });
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
