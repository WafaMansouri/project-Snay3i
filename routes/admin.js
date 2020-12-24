const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const Artisan = require("../models/artisan");
const Client = require("../models/client");
const Category = require("../models/category");
const ContactUs = require("../models/contactUs");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//login Admin
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
                return res.send({ errors: [{ msg: "Wrong password!" }] });
              } else {
                let payload = {
                  user_Id: admin._id,
                  first_name: admin.f_name,
                  last_name: admin.l_name,
                  email: admin.email,
                  category: admin.category,
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
);
// add new category
router.post(
  "/category",
  [body("name", "Your category must only consist of alphabetic").isAlpha()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Category.find({ name: req.body.name })
        // .exect()
        .then((category) => {
          if (category.length) {
            return res
              .status(400)
              .send({ errors: [{ msg: "Category already exists" }] });
          } else {
            //if not exist create category
            let newCategory = new Category(req.body);
            newCategory.save();
            res.send(newCategory);
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ errors: [{ msg: "Server Error!" }] });
        });
    }
  }
);
// delete category
router.delete("/delete_category/:name", (req, res) => {
  Category.findOneAndDelete({ name: req.params.name })
    // .exect()
    .then((category) => {
      res.status(200).send(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});
// Remove User
router.delete("/remove_user/:state/:id", (req, res) => {
  if (req.params.state === "Artisan")
    Artisan.findOneAndDelete({ _id: req.params.id })
      .then((artisan) => {
        res.status(200).send(artisan);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ errors: [{ msg: "Server Error!" }] });
      });
  else if (req.params.state === "Client")
    Client.findOneAndDelete({ _id: req.params.id })
      .then((client) => {
        res.status(200).send(client);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ errors: [{ msg: "Server Error!" }] });
      });
});
// Retrieve messages
router.get("/messages", (req, res) => {
  ContactUs.find()
    .exec()
    .then((messages) => {
      res.status(201).send(messages);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});
// Retrieve list of users
router.get("/users", (req, res) => {
  Artisan.find()
    .exec()
    .then((artisans) => {
      Client.find()
        .then((clients) => res.status(201).send([...artisans, ...clients]))
        .catch((err) => {
          console.log(err);
          res.status(500).send({ errors: [{ msg: "Server Error!" }] });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});

// Delete message
router.delete("/delete_message/:id", (req, res) => {
  ContactUs.findOneAndDelete({ _id: req.params.id })
    .then((message) => {
      console.log(message);
      res.status(200).send(message);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});

module.exports = router;
