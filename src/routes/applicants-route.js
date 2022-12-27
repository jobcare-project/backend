const express = require("express");
const {
  applyJobs,
  getCandidates,
} = require("../controllers/applicants-controller");
const applicantsRoutes = express.Router();
const { verifyToken } = require("../middleware/auth-middleware");

// @route POST api/applicants
// @desc Gửi một đơn xin việc mới cho nhà tuyển dụng
// @access private
applicantsRoutes.post("/", verifyToken, applyJobs);

// @route GET api/applicants
// @desc Lấy ra tất cả những người đang ứng tuyển
// @access private
applicantsRoutes.get("/", verifyToken, getCandidates);

// @route GET api/applicants
// @desc Lấy ra tất cả những người đang ứng tuyển
// @access private
// applicantsRoutes.get("/", verifyToken, getCandidates);

module.exports = applicantsRoutes;
