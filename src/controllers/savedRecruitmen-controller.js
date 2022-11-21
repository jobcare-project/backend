const {
  saveRecruitmentService,
  deleteSavedRecruitmentService,
  getAllSavedRecruitmentsService,
} = require("../services/savedRecruitment-service");

const saveRecruitment = async (req, res) => {
  return await saveRecruitmentService(req, res);
};

const deleteSavedRecruitment = async (req, res) => {
  return await deleteSavedRecruitmentService(req, res);
};

const getAllSavedRecruitments = async (req, res) => {
  return await getAllSavedRecruitmentsService(req, res);
};

module.exports = {
  saveRecruitment,
  deleteSavedRecruitment,
  getAllSavedRecruitments,
};
