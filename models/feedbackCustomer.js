"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FeedbackCustomer extends Model {
    static associate(models) {
    }
  }
  FeedbackCustomer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      feedbackId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      customerDetails: {
        type: DataTypes.JSON,
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
      modelName: "FeedbackCustomer", 
    }
  );
  return FeedbackCustomer;
};
