const express = require("express");

const Controller = require("./controller");

const router = express.Router();

router.route("/").get(Controller.getRestaurantsData);

router.route("/").post(Controller.createRestaurantData);

router.route("/:id").get(Controller.getRestaurantData);

router.route("/:id").put(Controller.updateRestaurantData);

router.route("/:id").delete(Controller.deleteRestaurantData);

module.exports = router;
