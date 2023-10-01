const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const Constants = require("./constants");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(),
    },
    userName: {
      type: DataTypes.STRING(),
      unique: "userName",
    },
    password: {
      type: DataTypes.STRING(),
    },
    contactNumber: {
      type: DataTypes.STRING(15),
    },
    email: {
      type: DataTypes.STRING(55),
      unique: "email",
    },
    role: {
      type: DataTypes.ENUM({
        values: Constants.roles,
      }),
      defaultValue: "user",
    },
    phiId:{
      type: DataTypes.INTEGER
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: true,
  }
);

module.exports = User;
