const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

const randomCodeGenerator = (length = 4) => {
  const result = Math.random().toString(36).substr(2, length);
  return result;
};

/**
 * Hash Password
 * @param {string} pwd
 * @returns {string}
 */
function hashPassword(pwd) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(pwd?.toString(), salt);
  return hash;
}

/**
 * check hash Password
 * @param {string} pwd
 * @param {string} dbPwd
 * @returns {string}
 */
function comparePassword(pwd, dbPwd) {
  var decode = bcrypt.compareSync(pwd?.toString(), dbPwd);
  return decode;
}

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (
  userId,
  userEmail,
  expires,
  type = "access",
  secret = process.env.TOKEN_SECRET
) => {
  const payload = {
    sub: { userId, userEmail },
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

function paginateResponse(data, page, limit) {
  const [result, total] = data;
  const totalPages = Math.ceil(total / limit);
  const nextPage = Number(page) + 1 > totalPages ? null : Number(page) + 1;
  const prevPage = Number(page) - 1 < 1 ? null : Number(page) - 1;
  return {
    data: [...result],
    meta: {
      totalRecords: total,
      itemsPerPage: result.length,
      currentPage: page,
      nextPage: nextPage,
      prevPage: prevPage,
      totalPages: totalPages,
    },
  };
}

module.exports = {
  randomCodeGenerator,
  catchAsync,
  hashPassword,
  comparePassword,
  generateToken,
  paginateResponse,
};
