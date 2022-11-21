"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SavedRecruitments extends Model {
    static associate(models) {
      SavedRecruitments.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "user_saved_recruitments",
      });
      SavedRecruitments.belongsTo(models.Jobs, {
        foreignKey: "jobId",
        as: "savedRecruitment_job",
      });
    }
  }
  SavedRecruitments.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      userId: DataTypes.UUID,
      jobId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "SavedRecruitments",
    }
  );
  return SavedRecruitments;
};
