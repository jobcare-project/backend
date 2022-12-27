const { Applicants } = require("../database/models");

const applyJobsServer = async (data) => {
  const newApplyJobs = await Applicants.create(data);
  return newApplyJobs ? newApplyJobs : false;
};

const getCandidatesByRecruiterIdServer = async (recruiterId) => {
  const candidates = await Applicants.findAll({
    where: { recruiterId, isDeleted: false },
    attributes: {
      exclude: ["ImageId", "updatedAt", "isDeleted"],
    },
  });
  return candidates ? candidates : false;
};

module.exports = { applyJobsServer, getCandidatesByRecruiterIdServer };
