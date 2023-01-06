const { SavedRecruitments } = require("../database/models");

const checkSavedRecruitmentByUserIdandJobId = async (userId, jobId) => {
  const isSaved = await SavedRecruitments.findOne({
    where: {
      jobId,
      userId,
    },
  });
  return isSaved;
};

const getAllSavedRecruitmentsServer = async (userId) => {
  const savedJobList = await SavedRecruitments.findAll({
    where: {
      userId,
    },
    include: "savedRecruitment_job",
  });
  return savedJobList ? savedJobList : false;
};

const saveRecruitmentServer = async (data) => {
  const isSaved = await SavedRecruitments.create(data);
  return isSaved ? isSaved : false;
};

const deleteSavedRecruitmentServer = async (savedId) => {
  const isDeleted = await SavedRecruitments.destroy({
    where: {
      id: savedId,
    },
  });
  return isDeleted ? isDeleted : false;
};

module.exports = {
  saveRecruitmentServer,
  deleteSavedRecruitmentServer,
  getAllSavedRecruitmentsServer,
  checkSavedRecruitmentByUserIdandJobId,
};
