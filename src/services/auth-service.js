const fs = require("fs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const { generateToken, generateAccessToken } = require("../utils/auth-util");
const { returnResponse } = require("../common/response");
const { statusCode, apiMessage, ROLE } = require("../utils/constants");
const {
  getUser,
  createUser,
  updateRefreshToken,
  deleteRefreshToken,
  updateProfile,
  getRefreshTokenServer,
} = require("../repository/user-repo");

const registerService = async (req, res) => {
  const { email, password, fullname, role } = req.body;

  if (!email || !password || !fullname) {
    return res
      .status(statusCode.BAD_REQUEST)
      .json(returnResponse(false, apiMessage.DATA_MISSING));
  }

  try {
    // Kiểm tra xem đã tồn tại User đó chưa
    const user = await getUser(email);
    if (user) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(returnResponse(false, apiMessage.ACCOUNT_EXIST));
    }

    // ALL good
    // Return token
    const tokens = generateToken({ email });

    const hashedPassword = await argon2.hash(password);

    await createUser({
      email,
      fullname,
      password: hashedPassword,
      role: role ? role : "user",
      refreshToken: tokens.refreshToken,
    });

    if (role === ROLE.RECRUITER) {
      return res.status(statusCode.OK).json(
        returnResponse(true, apiMessage.SUCCESS, {
          fullname,
          email,
          role: role,
        })
      );
    }

    return res.status(statusCode.OK).json(
      returnResponse(true, apiMessage.SUCCESS, {
        fullname,
        email,
        role: role ? role : "user",
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      })
    );
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(returnResponse(false, apiMessage.SERVER_ERROR));
  }
};

const loginService = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(statusCode.BAD_REQUEST)
      .json(returnResponse(false, apiMessage.DATA_MISSING));
  }

  try {
    const user = await getUser(email);

    if (!user) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(returnResponse(false, apiMessage.LOGIN_FAILED));
    }

    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(returnResponse(false, apiMessage.LOGIN_FAILED));
    }

    // All GOOD
    // Return token
    const tokens = generateToken(user);

    // Update refreshToken
    await updateRefreshToken(user, tokens.refreshToken);

    res.status(statusCode.OK).json(
      returnResponse(true, apiMessage.SUCCESS, {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        gender: user.gender,
        address: user.address,
        birth: user.birth,
        phoneNumber: user.phoneNumber,
        image: user.Image,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
    );
  } catch (error) {
    console.log("Login Error:", error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(returnResponse(false, apiMessage.SERVER_ERROR));
  }
};

const changePasswordService = async (req, res) => {
  const email = req.email;
  const { password, newPassword } = req.body;

  // Kiểm tra xem client có gửi đầy đủ data cần thiết hay chưa
  if (!email || !password || !newPassword) {
    return res
      .status(statusCode.BAD_REQUEST)
      .json(returnResponse(false, apiMessage.DATA_MISSING));
  }

  try {
    // Kiểm tra xem user đó có tồn tại hay chưa
    const user = await getUser(email);

    if (!user) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(returnResponse(false, apiMessage.LOGIN_FAILED));
    }

    // Nếu có thì kiểm tra xem mật khẩu người dùng vừa nhập có hợp lệ hay không
    const passwordValid = await argon2.verify(user.password, password);

    // Password không hợp lệ
    if (!passwordValid) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(returnResponse(false, apiMessage.LOGIN_FAILED));
    }

    // All Good
    const hashedPassword = await argon2.hash(newPassword);
    await updateProfile(user.id, { password: hashedPassword });

    return res
      .status(statusCode.OK)
      .json(returnResponse(true, apiMessage.SUCCESS));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(returnResponse(false, apiMessage.SERVER_ERROR));
  }
};

const logoutService = async (req, res) => {
  try {
    await deleteRefreshToken(req.id);
    return res
      .status(statusCode.OK)
      .send(returnResponse(true, apiMessage.SUCCESS));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(returnResponse(false, apiMessage.SERVER_ERROR));
  }
};

const checkUserService = async (req, res) => {
  try {
    const user = await getUser(req.email);

    if (!user) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(returnResponse(false, apiMessage.NOT_FOUND));
    }

    return res.status(statusCode.OK).json(
      returnResponse(true, apiMessage.SUCCESS, {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        gender: user.gender,
        address: user.address,
        birth: user.birth,
        phoneNumber: user.phoneNumber,
        image: user.Image,
        role: user.role,
        refreshToken: user.refreshToken,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
    );
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(returnResponse(false, apiMessage.SERVER_ERROR));
  }
};

// Refresh token
const refreshTokenService = async (req, res) => {
  // Kiểm tra refreshToken được gửi xuống từ body
  const { refreshToken } = req.body;

  if (refreshToken == null) {
    return res
      .status(statusCode.FORBIDDEN)
      .json(returnResponse(false, apiMessage.DATA_FOUND));
  }

  try {
    // Lấy ra user chứa refreshToken đó
    let userDb = await getRefreshTokenServer(refreshToken);

    if (!userDb.dataValues.refreshToken) {
      return res
        .status(statusCode.FORBIDDEN)
        .json(returnResponse(false, apiMessage.DATA_FOUND));
    }

    const refreshTokenDecoded = jwt.verify(
      refreshToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    if (Date.now() >= refreshTokenDecoded.exp * 1000) {
      return res
        .status(statusCode.FORBIDDEN)
        .json(returnResponse(false, apiMessage.DATA_FOUND));
    }

    const newTokens = generateAccessToken(userDb);

    return res.status(statusCode.OK).json(
      returnResponse(true, apiMessage.SUCCESS, {
        ...userDb.dataValues,
        accessToken: newTokens.accessToken,
      })
    );
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(returnResponse(false, apiMessage.SERVER_ERROR));
  }
};

module.exports = {
  registerService,
  loginService,
  logoutService,
  checkUserService,
  changePasswordService,
  refreshTokenService,
};
