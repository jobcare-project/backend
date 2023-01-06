const {
  returnResponseServerError,
  returnResponse,
} = require("../common/response");
const {
  saveRecruitmentServer,
  deleteSavedRecruitmentServer,
  getAllSavedRecruitmentsServer,
  checkSavedRecruitmentByUserIdandJobId,
} = require("../repository/savedRecruitment-repo");
const { statusCode, apiMessage } = require("../utils/constants");

const saveRecruitmentService = async (req, res) => {
  const userId = req.id;
  const { jobId } = req.body;

  if (!userId) {
    return res
      .status(statusCode.BAD_REQUEST)
      .json(returnResponse(false, apiMessage.UNAUTHORIZED));
  }

  try {
    const savedRecruitmentInDatabase =
      await checkSavedRecruitmentByUserIdandJobId(userId, jobId);

    if (savedRecruitmentInDatabase) {
      const isDeleted = await deleteSavedRecruitmentServer(
        savedRecruitmentInDatabase.dataValues.id
      );
      if (isDeleted) {
        return res
          .status(statusCode.OK)
          .json(returnResponse(true, apiMessage.SUCCESS));
      }
      return;
    }

    const savedRecruitment = await saveRecruitmentServer({ userId, jobId });

    if (!savedRecruitment) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(returnResponse(false, apiMessage.DATA_FOUND));
    }

    return res
      .status(statusCode.OK)
      .json(returnResponse(true, apiMessage.SUCCESS, savedRecruitment));
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(returnResponseServerError());
  }
};

const deleteSavedRecruitmentService = async (req, res) => {
  const savedId = req.params.id;

  try {
    const isDeleted = await deleteSavedRecruitmentServer(savedId);

    if (!isDeleted) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(returnResponse(false, apiMessage.DATA_FOUND));
    }

    return res
      .status(statusCode.OK)
      .json(returnResponse(true, apiMessage.SUCCESS));
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(returnResponseServerError());
  }
};

const getAllSavedRecruitmentsService = async (req, res) => {
  const userId = req.id;

  try {
    const savedJobList = await getAllSavedRecruitmentsServer(userId);

    if (!savedJobList) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(returnResponse(false, apiMessage.DATA_FOUND));
    }

    return res
      .status(statusCode.OK)
      .json(returnResponse(true, apiMessage.SUCCESS, savedJobList));
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(returnResponseServerError());
  }
};

module.exports = {
  saveRecruitmentService,
  deleteSavedRecruitmentService,
  getAllSavedRecruitmentsService,
};
