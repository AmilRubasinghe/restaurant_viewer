const express = require("express");

const { MetaDataRoutes } = require("./modules/metadata");

const { PhiRoutes } = require("./modules/phi-management");

const { RestaurantRoutes } = require("./modules/restaurant-management");

const { UserRoutes } = require("./modules/user-management");

const { CommonRoutes } = require("./modules/common");

const { checkAdminToken, checkAdminAndUserToken } = require("./middlewares/admin-middleware");

const { ReviewRoutes } = require("./modules/review-management");

const router = express.Router();

router.use("/", CommonRoutes);

router.use("/meta-data", checkAdminAndUserToken, MetaDataRoutes);

router.use("/phi-details", checkAdminToken, PhiRoutes);

router.use("/restaurant-details", checkAdminToken, RestaurantRoutes);

router.use("/user-details", checkAdminToken, UserRoutes);

router.use("/review", checkAdminAndUserToken, ReviewRoutes);

module.exports = router;
