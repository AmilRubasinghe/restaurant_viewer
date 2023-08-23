const sequelize = require("../../config/database");
const Phi = require("../modules/phi-management/phi");
const Restaurant = require("../modules/restaurant-management/restaurant");

module.exports = {
  generateTables: async () => {
    try {
      await sequelize.sync({ alter: true, force: false });
    } catch (error) {
      console.log(error);
    }
  },
};
