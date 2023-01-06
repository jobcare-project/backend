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

    const statisticalAppSort = statisticalApp.jobCount.sort(
      (a, b) => a.day - b.day
    );
    // console.log(
    //   "statisticalApp",
    //   statisticalApp.jobCount.sort((a, b) => a.day - b.day)
    // );

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
        jobCount: [...statisticalAppSort],
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
