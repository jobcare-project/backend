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
        sequelize.fn("YEAR", sequelize.col("createdAt")),
        "2022"
      ),
    },
    attributes: [[sequelize.fn("MONTH", sequelize.col("createdAt")), "month"]],
    group: ["month"],
  });

  return { jobCount };
};

module.exports = { getCounterUser, getStatisticalApp };
