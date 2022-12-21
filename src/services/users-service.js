const {
  getUserList,
  updateProfile,
  getUser,
  getDetailRecruiterServer,
  getUserById,
} = require("../repository/user-repo");
const { statusCode, apiMessage } = require("../utils/constants");
const {
  returnResponse,
  returnResponseServerError,
} = require("../common/response");

const getAllUsersService = async (req, res) => {
  try {
    const userList = await getUserList();

    return res
      .status(statusCode.OK)
      .json(returnResponse(true, apiMessage.SUCCESS, userList));
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(returnResponseServerError());
  }
};

const updateUserProfileService = async (req, res) => {
  const { id, email } = req;

  try {
    const user = await getUser(email);

    if (!user) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(returnResponse(false, apiMessage.DATA_MISSING));
    }

    const { password, refreshToken, ...rest } = user.dataValues;

    const data = {
      ...rest,
      ...req.body,
    };

    await updateProfile(id, data);
    const newUserData = await getUser(email);

    return res
      .status(statusCode.OK)
      .json(returnResponse(true, apiMessage.SUCCESS, newUserData));
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(returnResponseServerError());
  }
};

const deleteUserService = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await getUserById(userId);

    if (!user) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(returnResponse(false, apiMessage.DATA_MISSING));
    }

    await updateProfile(userId, { isDelete: true });

    const newListUser = await getUserList();

    return res
      .status(statusCode.OK)
      .json(returnResponse(true, apiMessage.SUCCESS, newListUser));
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(returnResponseServerError());
  }
};

// const assessRecuiterService = async (req, res) => {
//   const userId = req.id;
//   const { message, recruiterId } = req.body;

//   try {
//     const assessed = await createAssessRecruiterServer(
//       message,
//       userId,
//       recruiterId
//     );
//     return res.status(200).json({
//       success: true,
//       message: "Assess successfully!",
//       data: assessed,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error!",
//       data: {},
//     });
//   }
// };

const getDetailRecruiterService = async (req, res) => {
  const recruiterId = req.params.id;

  try {
    const recruiterDetails = await getDetailRecruiterServer(recruiterId);

    if (!recruiterDetails) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(returnResponse(false, apiMessage.DATA_FOUND));
    }

    return res
      .status(statusCode.OK)
      .json(returnResponse(true, apiMessage.SUCCESS, recruiterDetails));
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(returnResponseServerError());
  }
};

module.exports = {
  updateUserProfileService,
  getDetailRecruiterService,
  getAllUsersService,
  deleteUserService,
};
