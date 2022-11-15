require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const accessToken = jwt.sign(
    { userId: payload.id, email: payload.email, role: payload.role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "30d",
    }
  );
  const refreshToken = jwt.sign(
    { userId: payload.id, email: payload.email, role: payload.role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "365d",
    }
  );

  return { accessToken, refreshToken };
};

const generateAccessToken = (payload) => {
  const accessToken = jwt.sign(
    { userId: payload.id, email: payload.email, role: payload.role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "30d",
    }
  );

  return { accessToken };
};

module.exports = { generateToken, generateAccessToken };
