let express = require("express");
const connectDB = require("./helpers/connectDB");
const app = express();
const cors = require("cors");
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
// redirect routes
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/post", require("./routes/post"));
app.use("/profile", require("./routes/profile"));
app.use("/admin", require("./routes/admin"));
app.use("/category", require("./routes/category"));
app.use("/search", require("./routes/search"));
app.use("/visit", require("./routes/visit"));
app.use("/artisan", require("./routes/artisan"));
app.use("/client", require("./routes/client"));
app.use("/reject", require("./routes/reject"));
app.use("/update", require("./routes/update"));
app.use("/add_photo", require("./routes/add_photo"));
