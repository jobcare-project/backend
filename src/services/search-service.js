const {
  returnResponse,
  returnResponseServerError,
} = require("../common/response");
const {
  getCategoriesSearchServer,
  getJobsSearchServer,
} = require("../repository/search-repo");
const { apiMessage, statusCode } = require("../utils/constants");

const getCategoriesSearchService = async (req, res) => {
  try {
    const categories = await getCategoriesSearchServer();

    return res
      .status(statusCode.OK)
      .json(returnResponse(true, apiMessage.SUCCESS, categories));
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(returnResponseServerError());
  }
};

const getJobsSearchService = async (req, res) => {
  const dataSearch = req.query;

  try {
    const { title } = dataSearch;
    const jobList = await getJobsSearchServer(title);

    return res
      .status(statusCode.OK)
      .json(returnResponse(true, apiMessage.SUCCESS, jobList));
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(returnResponseServerError());
  }
};

module.exports = {
  getCategoriesSearchService,
  getJobsSearchService,
};
