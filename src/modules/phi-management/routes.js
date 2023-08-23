const express = require("express");

const Controller = require("./controller");

const router = express.Router();

router.route("/").get(Controller.getPhisData);

router.route("/").post(Controller.createPhiData);

router.route("/:id").get(Controller.getPhiData);

router.route("/:id").put(Controller.updatePhiData);

router.route("/:id").delete(Controller.deletePhiData);

module.exports = router;
