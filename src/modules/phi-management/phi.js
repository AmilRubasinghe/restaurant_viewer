const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const Constants = require("../metadata/constants");

class Phi extends Model {}

Phi.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    phiName: {
      type: DataTypes.STRING(),
    },
    registrationNo: {
      type: DataTypes.STRING(),
      unique: "registrationNo",
    },
    email: {
      type: DataTypes.STRING(100),
      unique: "email",
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
    modelName: "phi",
    timestamps: true,
  }
);

module.exports = Phi;
