"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
    }
  }
  Feedback.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Feedback",
    }
  );
  return Feedback;
};
