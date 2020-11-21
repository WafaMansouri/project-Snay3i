const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const Intervention = require("../models/intervention");
const Rate = require("../models/rate");
const Like = require("../models/like");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//get client requests
router.get("/requests", authMiddleware, (req, res) => {
  Intervention.find({
    id_client: req.user_Id,
    state: { $nin: ["Ignored By Client", "Rejected"] },
  })
    .sort({ created_at: -1 })
    .populate("id_artisan")
    .exec()
    .then((interventions) => {
      res.status(200).send(interventions);
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
        { state: "Ignored By Client" },
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
    }
  }
);
//Confirm the request
router.post(
  "/confirm",
  authMiddleware,
  [body("id_request", "id required").notEmpty()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Intervention.findByIdAndUpdate(
        req.body.id_request,
        { state: "Confirmed By Artisan" },
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
//Rating Artisan
router.post("/rating", authMiddleware, (req, res) => {
  Rate.findOneAndUpdate(
    { id_client: req.user_Id, id_artisan: req.body.id_artisan },
    { value: req.body.rate },
    { new: true, useFindAndModify: false }
  )
    .exec()
    .then((rate) => {
      if (rate) {
        res.status(200).send(rate);
      } else {
        let rate = new Rate({
          id_client: req.user_Id,
          id_artisan: req.body.id_artisan,
          value: req.body.rate,
        });
        rate.save();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});
// get rate of the visited artisan
router.get("/rating/:id", authMiddleware, (req, res) => {
  Rate.findOne({ id_artisan: req.params.id, id_client: req.user_Id })
    .exec()
    .then((rate) => {
      res.status(201).send(rate);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});
//add like post
router.post("/like", authMiddleware, (req, res) => {
  Like.findOne({
    id_client: req.user_Id,
    id_post: req.body.id_post,
    id_artisan: req.body.id_artisan,
  })
    .exec()
    .then((like) => {
      if (!like) {
        let like = new Like({
          id_client: req.user_Id,
          id_post: req.body.id_post,
          id_artisan: req.body.id_artisan,
        });
        like
          .save()
          .then((like) => {
            res.status(200).send(like);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({ errors: [{ msg: "Server Error!" }] });
          });
      }
    });
});

//delete like post
router.delete("/like/:id_post", authMiddleware, (req, res) => {
  Like.findOneAndDelete({ id_client: req.user_Id, id_post: req.params.id_post })
    .then((like) => {
      res.status(200).send(like);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});

// get all the likes of the client to the visited artisan
router.get("/like/:id", authMiddleware, (req, res) => {
  Like.find({ id_client: req.user_Id, id_artisan: req.params.id })
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
