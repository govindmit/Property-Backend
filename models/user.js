"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {

        }
    }
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            brokerageName: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: {
                    msg: "name must be unique !",
                },
            },
            officeAddress: {
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
            firstName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    checkLength(value) {
                        if (value.length >= 11) {
                            throw new Error("phone number not valid !");
                        }
                    },
                },
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            image: {
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
                allowNull: false,
            },
            trakheesiNumber: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            ORN: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            reraNumber: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            BRN: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            organizationName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            role: {
                type: DataTypes.INTEGER,
                // references: {
                //   model: "role", // 'Actors' would also work
                //   key: 'id'
                // },
                allowNull: false,
              },
              isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
              },
        },
        {
            sequelize,
            modelName: "UserDetails",
        }
    );
    return User;
};
