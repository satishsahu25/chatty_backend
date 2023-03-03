const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", true);
const dbconnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGOURL);
  
    console.log("Mongo connected");
  } catch (err) {
    // throw new Error(err);
    console.log("Mongo error", err);
  }
};

module.exports = dbconnect;
