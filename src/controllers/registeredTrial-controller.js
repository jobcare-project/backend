const {
  registeredTrialService,
  getAllRegisteredTrialService,
} = require("../services/registeredTrial-service");

const addRegisterTrial = async (req, res) => {
  return await registeredTrialService(req, res);
};

const getAllRegisteredTrial = async (req, res) => {
  return await getAllRegisteredTrialService(req, res);
};

module.exports = { addRegisterTrial, getAllRegisteredTrial };
