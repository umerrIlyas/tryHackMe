const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { Error } = require("mongoose");
dotenv.config();

// connecting db
exports.dataBaseConnection = async () => {
  try {
    mongoose.connect(process.env.DB_CONNECTION);
  } catch (err) {
    console.log("failed to connect to MongoDB", err.message);
  }
};
