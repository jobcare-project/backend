const { Jobs, Users, sequelize } = require("../database/models");
const { ROLE } = require("../utils/constants");

const getCounterUser = async () => {
  const recruiterCount = await Users.count({
    where: {
      role: ROLE.RECRUITER,
    },
  });
  const userCount = await Users.count({
    where: {
      role: ROLE.USER,
    },
  });

  return { userCount, recruiterCount };
};

const getStatisticalApp = async () => {
  const jobCount = await Jobs.count({
    where: {
      createdAt: sequelize.where(
        sequelize.fn("MONTH", sequelize.col("createdAt")),
        "01"
      ),
    },
    attributes: [[sequelize.fn("DAY", sequelize.col("createdAt")), "day"]],
    group: ["day"],
  });

  return { jobCount };
};

module.exports = { getCounterUser, getStatisticalApp };
