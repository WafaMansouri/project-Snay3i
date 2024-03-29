const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const router = express.Router();
const Artisan = require("../models/artisan");
const Intervention = require("../models/intervention");
const { body, validationResult } = require("express-validator");

// Search and visit profile by id
router.get("/artisan/:id", (req, res) => {
  Artisan.findOne({ _id: req.params.id })
    .exec()
    .then((artisan) => {
      res.status(201).send(artisan);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});
// Send request to Artisan
router.post(
  "/request",
  authMiddleware,
  [
    body("msg_client", "Your message shouldn't be empty").notEmpty(),
    body("start_date", "You should pick a date").notEmpty(),
    body("end_date", "You should pick a date").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Intervention.findOne({
        id_client: req.user_Id,
        id_artisan: req.body.id_artisan,
        state: { $in: ["Send Request", "Respond Artisan"] },
      })
        .exec()
        .then((intervention) => {
          if (!intervention) {
            let newIntervention = new Intervention({
              id_client: req.user_Id,
              id_artisan: req.body.id_artisan,
              msg_client: req.body.msg_client,
              start_date: req.body.start_date,
              end_date: req.body.end_date,
              state: "Send Request",
            });
            newIntervention.save();
            res.status(200).send(newIntervention);
          } else {
            res.status(200).send("You have already a request!");
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ errors: [{ msg: "Server Error!" }] });
        });
    }
  }
);
// Check request to Artisan
router.get("/request/:id", authMiddleware, (req, res) => {
  Intervention.findOne({ id_artisan: req.params.id, id_client: req.user_Id })
    .exec()
    .then((intervention) => {
      res.status(201).send(intervention);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});
module.exports = router;
