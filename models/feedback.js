"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {}
  }
  Feedback.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "customer_feedback",
    }
  );
  return Feedback;
};
