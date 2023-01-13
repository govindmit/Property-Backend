"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Property extends Model {
        static associate(models) {

        }
    }

    Property.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            uploadFile: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            propertyName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            propertyAddress: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            addressLine2: {
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
            propertySaleStatus: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            propertyPurpose: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            propertyCategory: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            propertyPermit: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            propertyType: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            beds: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            baths: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            sqft: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            completionStatus: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            ownershipStatus: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            amenities:{
                type: DataTypes.JSON,
                allowNull:true,
                defaultValue:[]
            },
            floorRange:{
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            saleValue:{
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            paymentMethod:{
                type: DataTypes.STRING,
                allowNull: true,
            },
            rentPerYear:{
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            rentFrequency:{
                type: DataTypes.STRING,
                allowNull: true,
            },
            contractPeriod:{
                type: DataTypes.STRING,
                allowNull: true,
            },
            vacancyNoticePeriod:{
                type: DataTypes.STRING,
                allowNull: true,
            },
            maintananceFee:{
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            paidBy:{
                type: DataTypes.STRING,
                allowNull: true,
            },


            status: {           
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: 'Inactive'
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
            modelName: "PropertyDetails",
        }
    );
    return Property;
};
