const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const router = express.Router();
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

// Create post
router.post("/", authMiddleware, [upload.single("avatar")], (req, res) => {
  let myBody = JSON.parse(req.body.info);
  let path = `${req.protocol}://${req.hostname}:4000/uploads/${req.file.filename}`;
  let newPost = new Post({
    ...myBody,
    id_owner: req.user_Id,
    photo: path,
  });

  newPost
    .save()
    .then((post) => res.status(201).send(post))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});

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
