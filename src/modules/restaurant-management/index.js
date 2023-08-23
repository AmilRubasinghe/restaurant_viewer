const Controller = require("./controller");

const Constants = require("./constants");

const Service = require("./service");

const Routes = require("./routes");

const Restaurant = require("./restaurant");

module.exports = {
  RestaurantConstants: Constants,

  RestaurantService: Service,

  RestaurantController: Controller,

  RestaurantRoutes: Routes,

  Restaurant: Restaurant,
};
