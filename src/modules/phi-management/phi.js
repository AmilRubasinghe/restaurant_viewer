const { DataTypes, Model } = require("sequelize");

const { Database } = require("../../../config");

const Constants = require("./constants");

const sequelize = Database.connect();

class Phi extends Model {}

Phi.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    phiName: {
      type: DataTypes.STRING(),
    },
    registrationNo: {
      type: DataTypes.STRING(),
    },
    email: {
      type: DataTypes.STRING(100),
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
    modelName: "phi",
    timestamps: true,
  }
);

module.exports = Phi;
