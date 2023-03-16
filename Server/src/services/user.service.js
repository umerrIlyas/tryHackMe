const httpStatus = require("http-status");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const { comparePassword } = require("../utils/index");

const createUser = async (userBody) => {
  const { email } = userBody;
  const duplicateUser = await User.findOne({
    email,
  });
  if (await duplicateUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  await User.create(userBody);
  return {
    statusCode: 200,
    succeeded: true,
    message: "Record added successfully",
  };
};

const loginUserWithEmailAndPassword = async (email, pwd) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  }
  const { password, ...rest } = user?._doc;
  if (!user || !password || !comparePassword(pwd, user.password)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return rest;
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

module.exports = {
  createUser,
  loginUserWithEmailAndPassword,
};
