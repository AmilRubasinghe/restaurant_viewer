const express = require("express");

const Controller = require("./controller");

const Validator = require("./validator");

const router = express.Router();

router.route("/").get(Controller.getUsers);

// router.route("/signup").post(Validator.create, Controller.createUser);

router.route("/:id").get(Controller.getUser);

router.route("/:id").put(Validator.update, Controller.updateUser);

router.route("/:id").delete(Controller.deleteUser);

module.exports = router;
