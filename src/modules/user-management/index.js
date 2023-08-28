const Controller = require("./controller");

const Constants = require("./constants");

const Service = require("./service");

const Routes = require("./routes");

const User = require("./user");

module.exports = {
  UserConstants: Constants,

  UserService: Service,

  UserController: Controller,

  UserRoutes: Routes,

  User: User,
};
