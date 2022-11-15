const express = require("express");
const applicantsRoutes = express.Router();
const { verifyToken } = require("../middleware/auth-middleware");

// @route POST api/assess
// @desc Gửi một đơn xin việc mới cho nhà tuyển dụng
// @access private
applicantsRoutes.post("/", verifyToken, () => {
  console.log("applicantsRoutes");
});

module.exports = applicantsRoutes;
