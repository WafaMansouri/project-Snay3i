const express = require("express");
const router = express.Router();
const ContactUs = require("../models/contactUs");

// Send message to the artisan
router.post("/", (req, res) => {
  let newMessage = new ContactUs(req.body.info);
  newMessage
    .save()
    .then((post) => res.status(201).send(post))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [{ msg: "Server Error!" }] });
    });
});

module.exports = router;
