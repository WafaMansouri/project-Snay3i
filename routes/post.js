const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const router = express.Router();
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");
// Create post
router.post(
  "/",
  authMiddleware,
  [
    body("description", "You should write a description").isLength({
      min: 10,
    }),
  ],
  (req, res) => {
    let newPost = new Post({ ...req.body, id_owner: req.user_Id });
    newPost
      .save()
      .then((post) => res.status(201).send(post))
      .catch((err) => {
        console.log(err);
        res.status(500).send({ errors: [{ msg: "Server Error!" }] });
      });
  }
);

// Get post by id_artisan
router.get("/", authMiddleware, (req, res) => {
  Post.find({ id_owner: req.user_Id })
    .then((posts) => res.status(200).send(posts))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});

module.exports = router;
