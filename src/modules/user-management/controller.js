const Service = require("./service");

const { SUCCESS, ERROR } = require("../../helper");

const { SUC_CODES, SUC_REGISTERED } = require("./constants").Codes;

const getUsers = async (req, res) => {
  try {
    const result = await Service.getUsers();

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getUser = async (req, res) => {
  try {
    const result = await Service.getUser(req.params);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const createUser = async (req, res) => {
  try {
    const result = await Service.createUser(req.body);

    SUCCESS(res, SUC_REGISTERED, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const updateUser = async (req, res) => {
  try {
    const result = await Service.updateUser(req.params, req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await Service.deleteUser(req.params);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

module.exports = {
  getUser,

  getUsers,

  createUser,

  updateUser,

  deleteUser,
};
