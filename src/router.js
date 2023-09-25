const express = require("express");

const { MetaDataRoutes } = require("./modules/metadata");

const { PhiRoutes } = require("./modules/phi-management");

const { RestaurantRoutes } = require("./modules/restaurant-management");

const { UserRoutes } = require("./modules/user-management");

const { CommonRoutes } = require("./modules/common");

const {
  checkAdminToken,
  checkAdminPhiAndUserToken,
} = require("./middlewares/admin-middleware");

const { ReviewRoutes } = require("./modules/review-management");

const router = express.Router();

router.use("/", CommonRoutes);

router.use("/meta-data", checkAdminPhiAndUserToken, MetaDataRoutes);

router.use("/phi-details", checkAdminToken, PhiRoutes);

router.use("/restaurant-details", checkAdminPhiAndUserToken, RestaurantRoutes);

router.use("/user-details", checkAdminPhiAndUserToken, UserRoutes);

router.use("/review", checkAdminPhiAndUserToken, ReviewRoutes);

module.exports = router;
