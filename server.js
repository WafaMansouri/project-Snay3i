let express = require("express");
const connectDB = require("./helpers/connectDB");
const app = express();
const ejs = require("ejs");
const path = require("path");

//public folder
express.static(".public");
// app.set("view engine", "ejs");

let PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  console.log(
    "The server is running, " +
      " please, open your browser on http://localhost:%s",
    PORT
  );
});
app.use(express.json());
// connect to our Database
connectDB();
// redirect routes
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/post", require("./routes/post"));
app.use("/profile", require("./routes/profile"));
app.use("/admin", require("./routes/admin"));
app.use("/category", require("./routes/category"));
app.use("/search", require("./routes/search"));
//
app.get("/", (req, res) => {
  res.send("hello");
});
