"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    static associate(models) {}
  }

  Property.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      upload_file: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      upload_docs: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      visiting_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      property_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      slug: {
        type: DataTypes.STRING,
      },
      property_address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address_line2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      landmark: {
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
      property_sale_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      property_purpose: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      property_category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      property_permit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      property_type: {
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
      completion_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      upload_video_title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      upload_video_description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ownership_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      amenities: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
      },
      sale_value: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rent_per_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rent_frequency: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contract_period: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vacancy_notice_period: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      maid_room: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      maintanance_fee: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      paid_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      home_highlight: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      floor_planes: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      occupancy_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      property_condition: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // status: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      //   defaultValue: "Inactive",
      // },
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
      modelName: "property_details",
    }
  );
  return Property;
};
