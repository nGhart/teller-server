const mongoose = require("mongoose");
require("dotenv").config();
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("connected to DB");
  } catch (error) {
    console.log("could not connect to DB");
  }
};
module.exports = connectToDB;
