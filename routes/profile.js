var express = require("express");
var multer = require("multer");
const path = require("path");
const router = express.Router();
const Artisan = require("../models/artisan");
//set storage engine
const storage = multer.diskStorage({
  destination: "..public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
// init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  // fileFilter: function (req, file, cb) {
  //   checkFileType(file, cb);
  // },
}).single("profileImage");
//check File Type
function checkFileType(file, cb) {
  //allowed ext
  const fileTypes = /jpeg|jpg|png|gif/;
  //check ext
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  //check mime
  const mimeType = fileTypes.test(file.mimeType);
  if (mimeType && extname) {
    return cb(null, true);
  } else cb("Error: Images only!");
}

router.post("/", function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      res.send({ errors: [{ msg: err }] });
    } else
      res.json({
        success: true,
        msg: "image uploaded",
      });
  });
});
module.exports = router;
