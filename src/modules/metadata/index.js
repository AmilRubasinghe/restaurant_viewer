const Controller = require("./controller");

const Constants = require("./constants");

const Service = require("./service");

const Routes = require("./routes");

module.exports = {
  MetaDataConstants: Constants,

  MetaDataService: Service,

  MetaDataController: Controller,

  MetaDataRoutes: Routes,
};
