const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const Intervention = require("../models/intervention");
const Rate = require("../models/rate");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//get client requests
router.get("/requests", authMiddleware, (req, res) => {
  Intervention.find({ id_client: req.user_Id })
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
// Search and visit profile by id
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
module.exports = router;
