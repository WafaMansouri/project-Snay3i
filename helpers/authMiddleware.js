const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (req, res, next) => {
  let token = req.header("auth-token");
  if (!token) {
    res.status(400).send({ errors: [{ msg: "You are not autorized!" }] });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) throw err;
    req.user_Id = payload.user_Id;
    req.state = payload.state;
    next();
  });
};
