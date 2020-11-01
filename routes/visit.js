const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const router = express.Router();
const Artisan = require("../models/artisan");
const Intervention = require("../models/intervention");
const { body, validationResult } = require("express-validator");

// Search and visit profile by id
router.get("/artisan/:id", authMiddleware, (req, res) => {
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
  [body("msg_client", "Your message shouldn't be empty").notEmpty()],
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
            //   res.status(201).send(intervention);
            // else
            let newIntervention = new Intervention({
              id_client: req.user_Id,
              id_artisan: req.body.id_artisan,
              msg_client: req.body.msg_client,
              state: "Send Request",
            });
            newIntervention.save();
            res.send(newIntervention);
          } else {
            res.send("You have already a request!");
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
