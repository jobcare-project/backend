const dotenv = require("dotenv");
const path = require("path");

if (!process.env.HOST) {
  dotenv.config({
    path: path.join(__dirname, "..", ".env"),
  });
}

module.exports = {
  // use_env_variable: true,
  // host: process.env.DATABASE_HOST,
  // username: process.env.DATABASE_USER,
  // password: process.env.DATABASE_PASSWORD,
  // port: process.env.DATABASE_PORT,
  // database: process.env.DATABASE_NAME,
  // dialect: process.env.DATABASE_DIALECT,
  // freezeTableName: true,
  HOST: "us-cdbr-east-06.cleardb.net",
  USER: "b5db21d2b0ccc9",
  PASSWORD: "857c5514",
  DB: "heroku_2805fd3256fbdf7",
};
