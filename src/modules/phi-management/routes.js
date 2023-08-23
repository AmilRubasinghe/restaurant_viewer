const express = require("express");

const Controller = require("./controller");

const router = express.Router();

const validator = require("./validator");

router.route("/").get(Controller.getPhisData);

router.route("/").post(validator.create, Controller.createPhiData);

router.route("/:id").get(Controller.getPhiData);

router.route("/:id").put(validator.update, Controller.updatePhiData);

router.route("/:id").delete(Controller.deletePhiData);

module.exports = router;
