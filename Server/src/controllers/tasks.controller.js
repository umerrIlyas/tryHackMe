const httpStatus = require("http-status");
const { User, UserTasks } = require("../models");
const { catchAsync } = require("../utils/index");
const { tasksService } = require("../services");

const getTasks = catchAsync(async (req, res) => {
  const result = await tasksService.getTasks(req);
  res.status(httpStatus.OK).send(result);
});

const addTask = catchAsync(async (req, res) => {
  const result = await tasksService.createTask(req);
  res.status(httpStatus.CREATED).send(result);
});

const removeTask = catchAsync(async (req, res) => {
  const result = await tasksService.delTask(req);
  res.status(httpStatus.OK).send(result);
});

const UpdateTask = catchAsync(async (req, res) => {
  const result = await tasksService.updateTask(req);
  res.status(httpStatus.OK).send(result);
});

module.exports = {
  addTask,
  getTasks,
  removeTask,
  UpdateTask,
};
