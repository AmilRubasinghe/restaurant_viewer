const { DataTypes, Model } = require("sequelize");

const { Database } = require("../../../config");

const Constants = require("./constants");

const sequelize = Database.connect();

class Restaurant extends Model {}

Restaurant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    restaurantName: {
      type: DataTypes.STRING(),
    },
    registrationNo: {
      type: DataTypes.STRING(),
    },
    registrationData: {
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
