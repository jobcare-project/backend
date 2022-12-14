const { Users, Jobs, Assess } = require("../database/models");

const getUserList = async () => {
  const userList = await Users.findAll({
    where: { isDelete: false },
    attributes: {
      exclude: ["password", "refreshToken", "createdAt", "updatedAt"],
    },
  });
  return userList ? userList : false;
};

const getUser = async (email) => {
  const user = await Users.findOne({
    where: {
      email: email,
    },
  });
  return user ? user : false;
};

const getUserById = async (id) => {
  const user = await Users.findOne({
    where: {
      id: id,
    },
    attributes: {
      exclude: ["password", "refreshToken", "createdAt", "updatedAt"],
    },
  });
  return user ? user : false;
};

const createUser = async (data) => {
  const user = await Users.create(data);
  return user ? user : false;
};

const updateRefreshToken = async (user, refreshToken) => {
  const newUser = await Users.update(
    { refreshToken: refreshToken },
    {
      where: {
        id: user.id,
      },
    }
  );
  return newUser;
};

const deleteRefreshToken = async (userId) => {
  const userUpdate = await Users.update(
    { refreshToken: null },
    {
      where: {
        id: userId,
      },
    }
  );
  return userUpdate;
};

const updateProfile = async (userId, payload) => {
  const newUserProfile = await Users.update(payload, {
    where: {
      id: userId,
    },
  });
  return newUserProfile ? newUserProfile : false;
};

const getDetailRecruiterServer = async (recruiterId) => {
  const recruiterDetails = await Users.findOne({
    where: {
      id: recruiterId,
    },
    attributes: {
      exclude: ["password", "refreshToken", "createdAt", "updatedAt"],
    },
    include: [
      {
        model: Jobs,
        where: {
          isDeleted: false,
        },
        as: "recruiter_jobs",
      },
      {
        model: Assess,
        as: "recruiter_assess",
      },
    ],
  });
  return recruiterDetails ? recruiterDetails : false;
};

const getRefreshTokenServer = async (token) => {
  const refreshTokenDb = await Users.findOne({
    where: {
      refreshToken: token,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  return refreshTokenDb ? refreshTokenDb : false;
};

module.exports = {
  getUserList,
  getUser,
  createUser,
  updateRefreshToken,
  deleteRefreshToken,
  updateProfile,
  getDetailRecruiterServer,
  getRefreshTokenServer,
  getUserById,
};
