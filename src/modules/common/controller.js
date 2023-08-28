const Service = require("./service");

const { SUCCESS, ERROR } = require("../../helper");

const { SUC_CODES, SUC_REGISTERED } = require("./constants").Codes;

const login = async (req, res) => {
  try {
    const result = await Service.login(req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

module.exports = {
  login,
};
