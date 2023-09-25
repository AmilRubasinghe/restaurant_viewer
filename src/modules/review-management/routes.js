const express = require("express");

const Controller = require("./controller");

const Validator = require("./validator");

const {
  checkAdminToken,
  checkAdminAndUserToken,
  checkAdminAndPhiToken,
  checkAdminPhiAndUserToken,
} = require("../../middlewares/admin-middleware");

const router = express.Router();

router.route("/").get(checkAdminPhiAndUserToken, Controller.getReviewsData);

router
  .route("/")
  .post(checkAdminAndUserToken, Validator.create, Controller.createReviewData);

router.route("/:id").get(checkAdminPhiAndUserToken, Controller.getReview);

router
  .route("/:id")
  .put(checkAdminAndPhiToken, Validator.update, Controller.updateReviewData);

router.route("/:id").delete(checkAdminToken, Controller.deleteReviewData);

module.exports = router;
