const Service = require("./service");

const { SUCCESS, ERROR } = require("../../helper");

const { SUC_CODES } = require("./constants").Codes;

const getPhisData = async (req, res) => {
  try {
    const result = await Service.getPhisData(req.query);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};


const getPhiData = async (req, res) => {
  try {
    const result = await Service.getPhi(req.params);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const createPhiData = async (req, res) => {
  try {
    const result = await Service.createPhiData(req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const updatePhiData = async (req, res) => {
  try {
    const result = await Service.updatePhiData(req.params, req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const deletePhiData = async (req, res) => {
  try {
    const result = await Service.deletePhiData(req.params);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

module.exports = {
  getPhiData,

  getPhisData,

  createPhiData,

  updatePhiData,

  deletePhiData,
};
