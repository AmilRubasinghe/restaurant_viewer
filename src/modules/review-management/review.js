const { DataTypes, Model } = require("sequelize");

const sequelize = require("../../../config/database");

const Restaurant = require("../restaurant-management/restaurant");

const User = require("../user-management/user");

const Constants = require("./constants");

class Review extends Model {}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },

    reviewDetails: {
      type: DataTypes.TEXT(),
    },

    status: {
      type: DataTypes.ENUM({
        values: Constants.status,
      }),
      allowNull: false,
    },

    phiArea: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "review",
    timestamps: true,
  }
);

User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });
Restaurant.hasMany(Review, { foreignKey: "restaurantId" });
Review.belongsTo(Restaurant, { foreignKey: "restaurantId" });

module.exports = Review;
