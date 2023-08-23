const { Database } = require("../../config");

const sequelize = Database.connect();

const Phi = require("../modules/phi-management/phi");

const Restaurant = require("../modules/restaurant-management/restaurant");

module.exports = {
  generateTables: async () => {
    try {
      await Phi.sync({ alter: true, force: false });
      await Restaurant.sync({ alter: true, force: false });
      // { alter: true }
    } catch (error) {
      console.log(error);
    }
  },
};
