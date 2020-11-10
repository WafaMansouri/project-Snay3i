const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const Intervention = require("../models/intervention");
const Rate = require("../models/rate");
const Post = require("../models/post");
const Like = require("../models/like");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//get artisan requests
router.get("/requests", authMiddleware, (req, res) => {
  Intervention.find({ id_artisan: req.user_Id })
    .sort({ created_at: -1 })
    .populate("id_client")
    .exec()
    .then((interventions) => {
      res.status(200).send(interventions);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});
//respond to Client
router.post("/response", authMiddleware, (req, res) => {
  Intervention.findOneAndUpdate(
    {
      id_artisan: req.user_Id,
      id_client: req.body.id_client,
      state: { $in: ["Send Request", "Respond Artisan"] },
    },
    { msg_artisan: req.body.msg_artisan, state: "Respond Artisan" },
    { new: true, useFindAndModify: false }
  )
    .exec()
    .then((intervention) => {
      res.status(200).send(intervention);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});
//Ignore request
router.post(
  "/ignore",
  authMiddleware,
  [body("id_request", "id required").notEmpty()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Intervention.findByIdAndUpdate(
        req.body.id_request,
        { state: "Ignored By Artisan" },
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
//Accept request
router.post(
  "/accept",
  authMiddleware,
  [body("id_request", "id required").notEmpty()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Intervention.findByIdAndUpdate(
        req.body.id_request,
        { state: "Accepted By Artisan" },
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
//get artisan all rates
router.get("/rates/:id_artisan", authMiddleware, (req, res) => {
  Rate.find({ id_artisan: req.params.id_artisan })
    .exec()
    .then((rates) => {
      if (rates.length) {
        let countRate = 0;
        rates.forEach((rate) => {
          countRate += rate.value;
        });
        let rate = countRate / rates.length;
        res.status(201).send({ rate });
      } else {
        res.status(201).send(null);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});
//get artisan all posts
router.get("/posts/:id", authMiddleware, (req, res) => {
  Post.find({ id_owner: req.params.id })
    .sort({ created_at: -1 })
    .exec()
    .then((posts) => {
      res.status(201).send(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});
//delete post
router.delete(`/deletePost/:id_post`, authMiddleware, (req, res) => {
  Post.findByIdAndDelete(req.params.id_post)
    .exec()
    .then((post) => {
      res.status(201).send(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});
//get artisan all LIKES
router.get("/likes/:id", authMiddleware, (req, res) => {
  Like.find({ id_artisan: req.params.id })
    .exec()
    .then((likes) => {
      res.status(201).send(likes);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});

module.exports = router;
