const Controller = require("./controller");

const Constants = require("./constants");

const Service = require("./service");

const Routes = require("./routes");

const Review = require("./review");

module.exports = {
  ReviewConstants: Constants,

  ReviewService: Service,

  ReviewController: Controller,

  ReviewRoutes: Routes,

  Review: Review,
};
