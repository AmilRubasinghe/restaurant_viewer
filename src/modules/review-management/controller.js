const Service = require("./service");

const { SUCCESS, ERROR } = require("../../helper");

const { SUC_CODES } = require("./constants").Codes;

const getReviewsData = async (req, res) => {
  try {
    const result = await Service.getReviewsData(req.query);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getReview = async (req, res) => {
  try {
    const result = await Service.getReview(req.params);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const createReviewData = async (req, res) => {
  try {
    const result = await Service.createReviewData({ ...req.body, userId: req.user.id });

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const updateReviewData = async (req, res) => {
  try {
    const result = await Service.updateReviewData(req.params, req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const deleteReviewData = async (req, res) => {
  try {
    const result = await Service.deleteReviewData(req.params);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

module.exports = {
  getReview,

  getReviewsData,

  createReviewData,

  updateReviewData,

  deleteReviewData,
};
