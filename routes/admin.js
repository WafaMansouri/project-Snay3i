const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const Category = require("../models/category");
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
module.exports = router;
