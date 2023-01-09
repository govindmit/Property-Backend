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
                // validate: {
                //     checkLength(value) {
                //         if (value.length >= 11) {
                //             throw new Error("phone number not valid !");
                //         }
                //     },
                // },
            },
            ladlinePhone: {
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
            profilPic: {
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
            passport: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            passportExpiry: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            BRN: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            reraNumber: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            organizationName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            extension: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: ''
            },
            noOfProperty: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            status: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: 'Inactive'
            },
            role: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            deletedBy: {
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            modelName: "UserDetails",
        }
    );
    return User;
};
