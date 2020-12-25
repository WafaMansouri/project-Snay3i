let express = require("express");
const connectDB = require("./helpers/connectDB");
const app = express();
const cors = require("cors");
const path = require("path");
//public folder
// express.static("public");
// app.set("view engine", "ejs");

let PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  console.log(
    "The server is running, " +
      " please, open your browser on http://localhost:%s",
    PORT
  );
});
//Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

// connect to our Database
connectDB();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("front/project/build"));
  app.get("*", (req, res) => {
    let url = req.originalUrl;
    if (!url.startsWith("/api/"))
      res.sendFile(
        path.join(__dirname, "front", "project", "build", "index.html")
      );
  });
}
// redirect routes
// const routes=require('./routes');
// app.use("/", routes);
app.use("/api/register", require("./routes/register"));
app.use("/api/login", require("./routes/login"));
app.use("/api/post", require("./routes/post"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/category", require("./routes/category"));
app.use("/api/search", require("./routes/search"));
app.use("/api/visit", require("./routes/visit"));
app.use("/api/artisan", require("./routes/artisan"));
app.use("/api/client", require("./routes/client"));
app.use("/api/reject", require("./routes/reject"));
app.use("/api/update", require("./routes/update"));
app.use("/api/add_photo", require("./routes/add_photo"));
app.use("/api/send_message", require("./routes/send_message"));
app.use("/api/reset_notif", require("./routes/reset_notif"));
app.use("/api/send_notif", require("./routes/send_notif"));
