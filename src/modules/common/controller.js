const Service = require("./service");

const { SUCCESS, ERROR } = require("../../helper");

const { SUC_CODES, SUC_REGISTERED, SUC_SEND, SUC_RESET } =
  require("./constants").Codes;

const login = async (req, res) => {
  try {
    const result = await Service.login(req.body);

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

const passwordRest = async (req, res) => {
  try {
    const result = await Service.passwordRest(req.body);

    SUCCESS(res, SUC_RESET, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const forgetPassword = async (req, res) => {
  try {
    const result = await Service.forgetPassword(req.body);

    SUCCESS(res, SUC_SEND, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

module.exports = {
  login,
  createUser,
  passwordRest,
  forgetPassword,
};
