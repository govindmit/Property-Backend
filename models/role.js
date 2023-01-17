"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // define association here
    }
  }
  Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        // allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        // allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      // underscored:true,
      // timestamps:true,
      modelName: "role",
    }
  );
  return Role;
};
