const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const createHttpError = require("http-errors");
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//* Routes
const authRouter = require("./Routes/auth"); //importing route
const tasksRouter = require("./Routes/tasks"); //importing route

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// enable cors
app.use(cors());
app.options("*", cors());

//* Bind Routes
app.use("/api/auth", authRouter);
app.use("/api", tasksRouter);

//* Catch HTTP 404
app.use((req, res, next) => {
  next(createHttpError(404));
});

//* Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || err.statusCode || 500);
  res.json({
    error: {
      status: err.status || err.statusCode || 500,
      message: err.message,
    },
  });
});

module.exports = app;
