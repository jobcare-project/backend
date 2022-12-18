const express = require("express");
const { getAdminChart } = require("../controllers/chart-controller");
const { checkAdmin, verifyToken } = require("../middleware/auth-middleware");

const chartRoutes = express.Router();

// @route POST api/chart/admin
// @desc Đưa ra dữ liệu chart cho admin
// @access private
chartRoutes.get("/admin", verifyToken, checkAdmin, getAdminChart);

module.exports = chartRoutes;
