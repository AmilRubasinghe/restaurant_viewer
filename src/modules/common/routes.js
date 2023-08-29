const express = require("express");

const Controller = require("./controller");

const Validator = require("./validator");

const router = express.Router();

router
  .route("/password-reset")
  .post(Validator.passwordReset, Controller.passwordRest);

router
  .route("/forget-password")
  .post(Validator.forgetPassword, Controller.forgetPassword);

router.route("/login").post(Validator.login, Controller.login);

router.route("/signup").post(Validator.create, Controller.createUser);


module.exports = router;
