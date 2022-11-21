require("dotenv").config();
const jwt = require("jsonwebtoken");

const { returnResponse } = require("../common/response");
const { statusCode, apiMessage } = require("../utils/constants");

const { ROLE } = require("../utils/constants");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(statusCode.FORBIDDEN)
      .json(returnResponse(false, apiMessage.FORBIDDEN));
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.id = decoded.userId;
    req.email = decoded.email;
    req.role = decoded.role;

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.UNAUTHORIZED)
      .json(returnResponse(false, apiMessage.UNAUTHORIZED));
  }
};

const checkAdmin = async (req, res, next) => {
  if (req.role !== ROLE.ADMIN) {
    return res
      .status(statusCode.UNAUTHORIZED)
      .json(returnResponse(false, apiMessage.UNAUTHORIZED));
  }

  next();
};

const checkRecruiter = async (req, res, next) => {
  if (req.role !== ROLE.RECRUITER) {
    return res
      .status(statusCode.UNAUTHORIZED)
      .json(returnResponse(false, apiMessage.UNAUTHORIZED));
  }

  next();
};

const checkUserRole = async (req, res, next) => {
  if (req.role !== ROLE.USER) {
    return res
      .status(statusCode.UNAUTHORIZED)
      .json(returnResponse(false, apiMessage.UNAUTHORIZED));
  }

  next();
};

module.exports = { verifyToken, checkRecruiter, checkUserRole, checkAdmin };
