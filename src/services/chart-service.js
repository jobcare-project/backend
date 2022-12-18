const {
  returnResponse,
  returnResponseServerError,
} = require("../common/response");
const {
  getCounterUser,
  getStatisticalApp,
} = require("../repository/chart-repo");
const { apiMessage, statusCode } = require("../utils/constants");

const getAdminChartService = async (req, res) => {
  try {
    const { userCount, recruiterCount } = await getCounterUser();
    const statisticalApp = await getStatisticalApp();

    const data = {
      doughnut: {
        labels: ["Người dùng", "Nhà tuyển dụng"],
        datasets: [
          {
            label: "Số lượng người dùng",
            data: [userCount, recruiterCount],
          },
        ],
      },
      lines: {
        label: "Thống kê số lượng tin tuyển dụng",
        ...statisticalApp,
      },
    };

    return res
      .status(statusCode.OK)
      .json(returnResponse(true, apiMessage.SUCCESS, data));
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(returnResponseServerError());
  }
};

module.exports = { getAdminChartService };
