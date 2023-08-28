const express = require("express");

const { MetaDataRoutes } = require("./modules/metadata");

const { PhiRoutes } = require("./modules/phi-management");

const { RestaurantRoutes } = require("./modules/restaurant-management");

const { UserRoutes } = require("./modules/user-management");

const { CommonRoutes } = require("./modules/common");

const router = express.Router();

router.use("/", CommonRoutes);

router.use("/meta-data", MetaDataRoutes);

router.use("/phi-details", PhiRoutes);

router.use("/restaurant-details", RestaurantRoutes);

router.use("/user-details", UserRoutes);

module.exports = router;
