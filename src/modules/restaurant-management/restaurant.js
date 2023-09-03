const { DataTypes, Model } = require("sequelize");

const sequelize = require("../../../config/database");

const Constants = require("../metadata/constants");

class Restaurant extends Model {}

Restaurant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    restaurantName: {
      type: DataTypes.STRING(),
    },
    registrationNo: {
      type: DataTypes.STRING(),
      unique: "registrationNo",
    },
    registrationDate: {
      type: DataTypes.DATE(),
    },
    contactNumber: {
      type: DataTypes.STRING(15),
    },
    address: {
      type: DataTypes.STRING(),
    },
    phiArea: {
      type: DataTypes.STRING(),
      allowNull: false,
      type: DataTypes.ENUM({
        values: Constants.locations,
      }),
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "restaurant",
    timestamps: true,
  }
);

module.exports = Restaurant;
