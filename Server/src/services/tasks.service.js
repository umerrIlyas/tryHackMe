const httpStatus = require("http-status");
const { User, UserTasks } = require("../models");
const ApiError = require("../utils/ApiError");
const { paginateResponse } = require("../utils/index");

const getTasks = async (req) => {
  const {
    body,
    user: { sub },
    query,
  } = req;

  const limit = query?.limit || 10;
  const pages = query?.pages || 1;
  const skip = (pages - 1) * limit;

  const isUser = await User.findById(sub.userId).select("-password");
  if (!isUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  }
  const tasksCount = await UserTasks.find({ user: isUser._id }).count();
  const tasks = await UserTasks.find({ user: isUser._id })
    .skip(skip)
    .limit(limit);
  const data = [tasks, tasksCount];
  const paginatedResp = paginateResponse(data, pages, limit);
  return paginatedResp;
};

const createTask = async (req) => {
  const {
    body,
    user: { sub },
  } = req;
  const isUser = await User.findById(sub.userId).select("-password");
  if (!isUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not found");
  }
  const createTask = await UserTasks.create({
    user: isUser,
    ...body,
  });
  return createTask;
};

const delTask = async (req) => {
  const {
    body,
    user: { sub },
    params,
  } = req;

  const taskQuery = { _id: params.taskId };
  const isRecord = await getTaskById(params.taskId);

  if (!isRecord) {
    throw new ApiError(httpStatus.NOT_FOUND, "Record Not found");
  }
  await UserTasks.deleteOne(isRecord);
  return {
    statusCode: 200,
    succeeded: true,
    message: "record deleted successfully",
  };
};

const updateTask = async (req) => {
  const {
    body,
    user: { sub },
    params,
  } = req;

  const query = { _id: params.taskId };
  const isRecord = await getTaskById(params.taskId);
  if (!isRecord) {
    throw new ApiError(httpStatus.NOT_FOUND, "Record Not found");
  }

  const updatedRecord = await UserTasks.findByIdAndUpdate(query, body, {
    upsert: true,
  });

  const result = await getTaskById(params.taskId);

  return {
    statusCode: 200,
    succeeded: true,
    message: "record updated successfully",
    data: result,
  };
};

const getTaskById = async (id) => {
  return await UserTasks.findById(id);
};

module.exports = {
  createTask,
  getTasks,
  delTask,
  updateTask,
};
