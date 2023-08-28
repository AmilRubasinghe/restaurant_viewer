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
