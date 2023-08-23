const Controller = require("./controller");

const Constants = require("./constants");

const Service = require("./service");

const Routes = require("./routes");

const Phi = require("./phi");

module.exports = {
  PhiConstants: Constants,

  PhiService: Service,

  PhiController: Controller,

  PhiRoutes: Routes,

  Phi: Phi,
};
