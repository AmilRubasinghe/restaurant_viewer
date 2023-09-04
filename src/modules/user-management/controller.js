const Service = require("./service");

const { SUCCESS, ERROR } = require("../../helper");

const { SUC_CODES } = require("./constants").Codes;

const getUsers = async (req, res) => {
  try {
    const result = await Service.getUsers(req.query);

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

  updateUser,

  deleteUser,
};
