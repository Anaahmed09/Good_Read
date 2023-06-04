const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to database");
  } catch (error) {
    console.error(error);
  }
};
