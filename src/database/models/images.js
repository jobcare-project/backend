"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    static associate(models) {
      Images.hasOne(models.Applicants, {
        foreignKey: "imageId",
      });
      Images.hasOne(models.Users, {
        foreignKey: "imageId",
      });
    }
  }
  Images.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      data: DataTypes.BLOB,
    },
    {
      sequelize,
      modelName: "Images",
    }
  );
  return Images;
};
