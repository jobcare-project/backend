"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Jobs, {
        foreignKey: "recruiterId",
        as: "recruiter_jobs",
      });
      Users.hasMany(models.Assess, {
        foreignKey: "userId",
        as: "user_assess",
      });
      Users.hasMany(models.Assess, {
        foreignKey: "recruiterId",
        as: "recruiter_assess",
      });
      Users.hasMany(models.Applicants, {
        foreignKey: "userId",
        as: "user_applicants",
      });
      Users.belongsTo(models.Images, {
        foreignKey: "imageId",
      });
      Users.hasMany(models.SavedRecruitments, {
        foreignKey: "userId",
        as: "user_saved_recruitments",
      });
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      fullname: DataTypes.STRING,
      role: DataTypes.STRING,
      refreshToken: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      imageId: DataTypes.UUID,
      birth: DataTypes.STRING,
      isDelete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
