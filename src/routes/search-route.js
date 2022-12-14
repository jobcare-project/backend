const express = require("express");
const {
  getCategoriesSearch,
  getJobsSearch,
} = require("../controllers/search-controller");
const searchRoutes = express.Router();

// @route GET api/search/categories
// @desc Lấy ra các dữ liệu cho dropdown tìm kiếm
// @access public
searchRoutes.get("/categories", getCategoriesSearch);

// @route GET api/search/jobs
// @desc Tìm kiếm công việc
// @access public
searchRoutes.get("/jobs", getJobsSearch);

module.exports = searchRoutes;
