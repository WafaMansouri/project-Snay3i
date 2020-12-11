const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Client = require("../models/client");
const Artisan = require("../models/artisan");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");

router.post(
  "/",
  [
    body("f_name")
      .notEmpty()
      .withMessage("Please enter your first name")
      .isAlpha()
      .withMessage("First name must only consist of alphabetic"),
    body("l_name")
      .notEmpty()
      .withMessage("Please enter your last name")
      .isAlpha()
      .withMessage("Last name must only consist of alphabetic"),
    body("email")
      .notEmpty()
      .withMessage("Please enter your email")
      .isEmail()
      .withMessage("please enter a valid email"),
    body("password")
      .notEmpty()
      .withMessage("Please enter your password")
      .isLength({
        min: 5,
      })
      .withMessage("Password must have 5 characters at least"),
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
        if (!req.body.category)
          res
            .status(500)
            .send({ errors: [{ msg: "Please select a category!" }] });
        else if (!req.body.address)
          res
            .status(500)
            .send({ errors: [{ msg: "Please select your governorate!" }] });
        else
          Artisan.find({ email: req.body.email })
            .then((artisan) => {
              if (artisan.length) {
                return res
                  .status(400)
                  .send({ errors: [{ msg: "Email already exists" }] });
              }
              //if not exist create artisan
              let newArtisan = new Artisan({
                ...req.body,
                _id: new mongoose.Types.ObjectId(),
              });
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
