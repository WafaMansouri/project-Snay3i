const mongoos = require("mongoose");
require("dotenv").config();
const connectDB = () => {
  mongoos.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (err) => {
      if (err) throw err;
      console.log("Database connected");
    }
  );
};
module.exports = connectDB;
