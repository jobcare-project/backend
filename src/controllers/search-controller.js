const {
  getCategoriesSearchService,
  getJobsSearchService,
} = require("../services/search-service");

const getCategoriesSearch = async (req, res) => {
  return await getCategoriesSearchService(req, res);
};

const getJobsSearch = async (req, res) => {
  return await getJobsSearchService(req, res);
};

module.exports = { getCategoriesSearch, getJobsSearch };
