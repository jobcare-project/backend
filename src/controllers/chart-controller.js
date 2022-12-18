const { getAdminChartService } = require("../services/chart-service");

const getAdminChart = async (req, res) => {
  return await getAdminChartService(req, res);
};

module.exports = { getAdminChart };
