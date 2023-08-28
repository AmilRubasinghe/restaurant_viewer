const express = require("express");

const Controller = require("../user-management/controller");

const CommonController = require("./controller");

const Validator = require("../user-management/validator");

const CommonValidator = require("./validator");

const router = express.Router();

// router
//   .route("/password-reset")
//   .post(CommonValidator.passwordRest, CommonController.passwordRest);

router.route("/login").post(CommonValidator.login, CommonController.login);

router.route("/signup").post(Validator.create, Controller.createUser);

module.exports = router;
