const { returnResponse } = require("../common/response");
const {
  createRegisteredTrialServer,
  getAllRegisteredTrialServer,
} = require("../repository/registeredTrial-repo");
const { getUser } = require("../repository/user-repo");
const { statusCode, apiMessage } = require("../utils/constants");

const registeredTrialService = async (req, res) => {
  const { fullname, email, phoneNumber } = req.body;

  if (!fullname || !email || !phoneNumber) {
    return res
      .status(statusCode.BAD_REQUEST)
      .json(returnResponse(false, apiMessage.DATA_MISSING));
  }

  try {
    const isAlreadyExistEmail = await getUser(email);

    if (isAlreadyExistEmail) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(returnResponse(false, apiMessage.ACCOUNT_EXIST));
    }

    // All Good
    const newRegistered = await createRegisteredTrialServer({
      fullname,
      email,
      phoneNumber,
    });

    return res
      .status(statusCode.OK)
      .json(returnResponse(true, apiMessage.SUCCESS, newRegistered));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(returnResponse(false, apiMessage.SERVER_ERROR));
  }
};

const getAllRegisteredTrialService = async (req, res) => {
  try {
    const registeredList = await getAllRegisteredTrialServer();

    if (!registeredList) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(returnResponse(false, apiMessage.DATA_FOUND));
    }

    return res
      .status(statusCode.OK)
      .json(returnResponse(true, apiMessage.SUCCESS, registeredList));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(returnResponse(false, apiMessage.SERVER_ERROR));
  }
};

module.exports = { registeredTrialService, getAllRegisteredTrialService };
