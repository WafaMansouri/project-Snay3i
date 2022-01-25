const mongoos = require("mongoose");
require("dotenv").config();
const connectDB = () => {
  mongoos.connect(
//     process.env.MONGO_URI,
    "mongodb+srv://wafa:tyKRX7ZBLp@projectdb.sxprs.mongodb.net/<dbname>?retryWrites=true&w=majority",
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
