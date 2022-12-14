const { Op } = require("sequelize");
const { JobCategories, Jobs } = require("../database/models");

const getCategoriesSearchServer = async () => {
  const jobCategories = await JobCategories.findAll({
    attributes: ["name"],
  });
  const cityCategories = await Jobs.findAll({
    where: {
      city: {
        [Op.not]: ["null", ""],
      },
    },
    attributes: ["city"],
    group: ["city"],
  });
  const workFrom = await Jobs.findAll({
    where: {
      workFrom: {
        [Op.not]: ["null", ""],
      },
    },
    attributes: ["workFrom"],
    group: ["workFrom"],
  });

  return { jobCategories, cityCategories, workFrom };
};

const getJobsSearchServer = async (text) => {
  const jobList = await Jobs.findAll({
    where: {
      title: {
        [Op.like]: `%${text}%`,
      },
    },
  });
  return jobList ? jobList : false;
};

module.exports = {
  getCategoriesSearchServer,
  getJobsSearchServer,
};
