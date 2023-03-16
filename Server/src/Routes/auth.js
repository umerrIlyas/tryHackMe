const express = require("express");
const router = express.Router();
const Validator = require("../middlewares/Validator");
const authController = require("../controllers/auth.controller");

router
  .post("/register", Validator("register"), authController.register)
  .post("/login", Validator("login"), authController.login);

module.exports = router;
