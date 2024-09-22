const serverless = require("serverless-http");
const express = require("express");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const userRouter = require("./routes/user.router.js");
const DbConnect = require("./config/db.js");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  try {
    DbConnect();
    next();
  } catch (err) {
    next(err);
  }
});

app.use("/api/v1", userRouter);

//error middleware
app.use((err, req, res, next) => {
  //variables
  err.status = err.status || 500;
  err.success = err.success || false;
  err.data = err.data || null;

  if (err instanceof multer.MulterError) {
    err.message = "File upload error";
  } else {
    err.message = err.message || "Something went wrong";
  }

  //sending response to the client
  res.status(err.status).json({
    message: err.message,
    success: err.success,
    data: err.data,
    status: err.status,
  });
});

exports.handler = serverless(app);
