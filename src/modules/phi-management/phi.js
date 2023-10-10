const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../config/database");
const Constants = require("../metadata/constants");
const User = require("../user-management/user");

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

    registrationNo: {
      type: DataTypes.STRING(),
      unique: "registrationNo",
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

User.hasOne(Phi, {
  onDelete: "cascade",
  foreignKey: {
    name: "userId",
    allowNull: true,
  },
});
Phi.belongsTo(User, { foreignKey: "userId" });
module.exports = Phi;
