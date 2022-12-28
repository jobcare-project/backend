const { Applicants, Users, Jobs } = require("../database/models");

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
    // include: ["job_applicants", "user_applicants"],
    include: [
      {
        model: Users,
        attributes: {
          exclude: [
            "password",
            "role",
            "refreshToken",
            "createdAt",
            "updatedAt",
            "isDelete",
          ],
        },
        as: "user_applicants",
      },
      {
        model: Jobs,
        attributes: {
          exclude: ["isDeleted"],
        },
        as: "job_applicants",
      },
    ],
  });
  return candidates ? candidates : false;
};

module.exports = { applyJobsServer, getCandidatesByRecruiterIdServer };
