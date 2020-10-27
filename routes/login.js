const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const router = express.Router();
const Client = require("../models/client");
const Artisan = require("../models/artisan");
const Admin = require("../models/admin");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Load connected client
router.get("/", authMiddleware, (req, res) => {
  if (req.state === "Client") {
    //Load Client Data
    Client.findById(req.user_Id)
      .select("-password -__v")
      .exec()
      .then((client) => {
        if (!client) {
          return res
            .status(404)
            .send({ errors: [{ msg: "Client not found!" }] });
        } else return res.status(200).send(client);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ errors: [{ msg: "Server Error!" }] });
      });
  } else if (req.state === "Artisan") {
    //Load Artisan Data
    Artisan.findById(req.user_Id)
      .select("-password -__v")
      .exec()
      .then((artisan) => {
        if (!artisan) {
          return res
            .status(404)
            .send({ errors: [{ msg: "Artisan not found!" }] });
        } else return res.status(200).send(artisan);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ errors: [{ msg: "Server Error!" }] });
      });
  } else if (req.state === "Admin") {
    //Load Admin Data
    Admin.findById(req.user_Id)
      .select("-password -__v")
      .exec()
      .then((admin) => {
        if (!admin) {
          return res
            .status(404)
            .send({ errors: [{ msg: "Admin not found!" }] });
        } else return res.status(200).send(admin);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ errors: [{ msg: "Server Error!" }] });
      });
  }
});
// Login user
router.post(
  "/",
  [
    body("email", "please enter a valid email").isEmail(),
    body("password", "Please enter your password!").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (req.body.state === "Client") {
      //Client Model request
      Client.findOne({ email: req.body.email })
        .then((client) => {
          if (!client) {
            res
              .status(404)
              .send({ errors: [{ msg: "Your are not registered!" }] });
          } else {
            bcrypt.compare(
              req.body.password.toString(),
              client.password,
              function (err, isMatch) {
                if (err) {
                  throw err;
                }
                if (!isMatch) {
                  return res
                    .status(401)
                    .send({ errors: [{ msg: "Wrong password!" }] });
                } else {
                  let payload = {
                    user_Id: client._id,
                    first_name: client.f_name,
                    last_name: client.l_name,
                    email: client.email,
                    state: "Client",
                  };
                  jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
                    if (err) throw err;
                    res.send({ token });
                  });
                }
              }
            );
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ errors: [{ msg: "Server Error!" }] });
        });
    }
    //Artisan Model request
    else if (req.body.state === "Artisan") {
      Artisan.findOne({ email: req.body.email })
        .then((artisan) => {
          if (!artisan) {
            res
              .status(404)
              .send({ errors: [{ msg: "Your are not registered!" }] });
          } else {
            bcrypt.compare(
              req.body.password.toString(),
              artisan.password,
              function (err, isMatch) {
                if (err) {
                  throw err;
                }
                if (!isMatch) {
                  return res
                    .status(401)
                    .send({ errors: [{ msg: "Wrong password!" }] });
                } else {
                  let payload = {
                    user_Id: artisan._id,
                    first_name: artisan.f_name,
                    last_name: artisan.l_name,
                    email: artisan.email,
                    state: "Artisan",
                  };
                  jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
                    if (err) throw err;
                    res.send({ token });
                  });
                }
              }
            );
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ errors: [{ msg: "Server Error!" }] });
        });
    }
    //Admin Model request
    else if (req.body.state === "Admin") {
      Admin.findOne({ email: req.body.email })
        .then((admin) => {
          if (!admin) {
            res
              .status(404)
              .send({ errors: [{ msg: "Your are not registered!" }] });
          } else {
            bcrypt.compare(
              req.body.password.toString(),
              admin.password,
              function (err, isMatch) {
                if (err) {
                  throw err;
                }
                if (!isMatch) {
                  return res
                    .status(401)
                    .send({ errors: [{ msg: "Wrong password!" }] });
                } else {
                  let payload = {
                    user_Id: admin._id,
                    first_name: admin.f_name,
                    last_name: admin.l_name,
                    email: admin.email,
                    state: "Admin",
                  };
                  jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
                    if (err) throw err;
                    res.send({ token });
                  });
                }
              }
            );
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ errors: [{ msg: "Server Error!" }] });
        });
    }
  }
);

module.exports = router;
