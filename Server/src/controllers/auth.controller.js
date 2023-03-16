const httpStatus = require("http-status");
const { hashPassword, generateToken } = require("../utils/index");
const { catchAsync } = require("../utils/index");
const { userService } = require("../services");
const moment = require("moment");

const register = catchAsync(async (req, res) => {
  const { body } = req;
  const { password: pwd, name, email } = body;
  const password = hashPassword(pwd);
  const user = await userService.createUser({ password, email, name });
  res.status(httpStatus.CREATED).send(user);
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.loginUserWithEmailAndPassword(email, password);
  const accessTokenExpires = moment().add(
    process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    "minutes"
  );
  const accessToken = generateToken(user._id, user.email, accessTokenExpires);
  res.send({ ...user, accessToken });
});

module.exports = {
  register,
  login,
};
