const { RegisteredTrial } = require("../database/models");

const createRegisteredTrialServer = async (data) => {
  const newRegister = await RegisteredTrial.create(data);
  return newRegister ? newRegister : false;
};

const getAllRegisteredTrialServer = async () => {
  const registeredList = await RegisteredTrial.findAll();
  return registeredList ? registeredList : false;
};

module.exports = { createRegisteredTrialServer, getAllRegisteredTrialServer };
