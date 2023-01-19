"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      brokerage_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      office_address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        // validate: {
        //     checkLength(value) {
        //         if (value.length >= 11) {
        //             throw new Error("phone number not valid !");
        //         }
        //     },
        // },
      },
      landline_phone: {
        type: DataTypes.STRING,
        allowNull: true,
        // validate: {
        //     checkLength(value) {
        //         if (value.length >= 11) {
        //             throw new Error("phone number not valid !");
        //         }
        //     },
        // },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profile_pic: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: {
            msg: "Must be an EMAIL proper",
          },
        },
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      trakheesi_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ORN: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      passport: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      passport_expiry: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      BRN: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rera_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      organization_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      extension: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      no_of_property: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Inactive",
      },
      role_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address_line: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      number_of_locality: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      locality_name: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      licensing_emmirate: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      brokerage_email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      property_manage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      brokerage_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      customer_feedback: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deleted_by: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return User;
};
