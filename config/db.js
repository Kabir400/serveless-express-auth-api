const mongoose = require("mongoose");

let conn = null;

const uri = process.env.MONGO_URI;

DbConnect = async () => {
  if (conn == null) {
    console.log("creating a new mongodb connection");
    conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
  } else {
    console.log("Using existing mongodb connection");
  }

  return conn;
};

module.exports = DbConnect;
