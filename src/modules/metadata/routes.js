const express = require("express");

const Controller = require("./controller");

const router = express.Router();

router.route("/").get(Controller.getMetaData);

module.exports = router;
