const express = require("express");
const {
  saveRecruitment,
  deleteSavedRecruitment,
  getAllSavedRecruitments,
} = require("../controllers/savedRecruitmen-controller");
const { verifyToken } = require("../middleware/auth-middleware");
const savedRecruitmentRoutes = express.Router();

// @route POST api/job/save
// @desc Lưu bài tin tuyển dụng cho người dùng
// @access private
savedRecruitmentRoutes.post("/", verifyToken, saveRecruitment);

// @route DELETE api/job/save
// @desc Hủy lưu tin tuyển dụng
// @access private
savedRecruitmentRoutes.delete("/:id", verifyToken, deleteSavedRecruitment);

// @route GET api/job/save
// @desc Lấy ra tất cả những tin tuyển dụng đã lưu của người dùng đã đăng nhập
// @access private
savedRecruitmentRoutes.get("/", verifyToken, getAllSavedRecruitments);

module.exports = savedRecruitmentRoutes;
