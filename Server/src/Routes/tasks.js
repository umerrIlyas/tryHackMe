const express = require("express");
const verifyToken = require("../middlewares/auth");
const tasksController = require("../controllers/tasks.controller");
const router = express.Router();
const Validator = require("../middlewares/Validator");

router
  .get("/tasks", verifyToken, tasksController.getTasks)
  .post("/tasks", verifyToken, Validator("task"), tasksController.addTask)
  .delete("/:taskId/tasks", verifyToken, tasksController.removeTask)
  .patch("/:taskId/tasks", verifyToken, tasksController.UpdateTask);

module.exports = router;
