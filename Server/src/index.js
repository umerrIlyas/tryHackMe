const app = require("./app");
const { dataBaseConnection } = require("./config/databaseConnection.js");
const dotenv = require("dotenv");
dotenv.config();

let server;
const PORT = process.env.PORT || 5030;

// database connection
dataBaseConnection().then(() => {
  console.log("Connected to database");
  server = app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
