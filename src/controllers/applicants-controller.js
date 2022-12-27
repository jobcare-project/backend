const {
  applyJobsService,
  getCandidatesForRecruiterService,
} = require("../services/applicants-service");

const applyJobs = async (req, res) => {
  return await applyJobsService(req, res);
};

const getCandidates = async (req, res) => {
  return await getCandidatesForRecruiterService(req, res);
};

module.exports = { applyJobs, getCandidates };
