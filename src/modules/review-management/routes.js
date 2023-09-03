const express = require("express");

const Controller = require("./controller");

const Validator = require("./validator");

const router = express.Router();

router.route("/").get(Controller.getReviewsData);

router.route("/").post(Validator.create, Controller.createReviewData);

router.route("/:id").get(Controller.getReview);

router.route("/:id").delete(Controller.deleteReviewData);

module.exports = router;
