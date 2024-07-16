const mongoose = require("mongoose");

const conn = () => {
  try {
    mongoose.connect(process.env.mongo_uri);
    mongoose.connection.once("open", () => {
      console.log("connected to mongodb");
    });
  } catch (error) {
    console.error(
      `Something went wrong with connect to the database ${error.message}`
    );
  }
};

module.exports = conn;






