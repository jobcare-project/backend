const {
  returnResponseServerError,
  returnResponse,
} = require("../common/response");
const {
  applyJobsServer,
  getCandidatesByRecruiterIdServer,
} = require("../repository/applicants-repo");
const { statusCode, apiMessage } = require("../utils/constants");

const applyJobsService = async (req, res) => {
  const userId = req.id;
  const { jobId, coverLetter, imageUrl, recruiterId } = req.body;

  try {
    const newApplyJobs = await applyJobsServer({
      userId,
      jobId,
      coverLetter,
      imageUrl,
      recruiterId,
    });

    if (!newApplyJobs) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(returnResponse(false, apiMessage.DATA_FOUND));
    }

    return res
      .status(statusCode.OK)
      .json(returnResponse(true, apiMessage.SUCCESS, newApplyJobs));
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(returnResponseServerError());
  }
};

const getCandidatesForRecruiterService = async (req, res) => {
  const recruiterId = req.id;
  try {
    const candidates = await getCandidatesByRecruiterIdServer(recruiterId);
    return res
      .status(statusCode.OK)
      .json(returnResponse(true, apiMessage.SUCCESS, candidates));
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(returnResponseServerError());
  }
};

const getAppliedJobsService = async () => {
  try {
    // const candidates = await getCandidatesServer();
    // return res
    //   .status(statusCode.OK)
    //   .json(returnResponse(true, apiMessage.SUCCESS, candidates));
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(returnResponseServerError());
  }
};

module.exports = {
  applyJobsService,
  getCandidatesForRecruiterService,
  getAppliedJobsService,
};
