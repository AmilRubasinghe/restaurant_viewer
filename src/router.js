const express = require("express");

const { MetaDataRoutes } = require("./modules/metadata");

const { PhiRoutes } = require("./modules/phi-management");

const { RestaurantRoutes } = require("./modules/restaurant-management");

const router = express.Router();

router.use("/meta-data", MetaDataRoutes);

router.use("/phi-details", PhiRoutes);

router.use("/restaurant-details", RestaurantRoutes);

module.exports = router;
