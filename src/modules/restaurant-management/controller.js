const Service = require("./service");

const { SUCCESS, ERROR } = require("../../helper");

const { SUC_CODES } = require("./constants").Codes;

const getRestaurantsData = async (req, res) => {
  try {
    const result = await Service.getRestaurantsData(req.query);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getRestaurantData = async (req, res) => {
  try {
    const result = await Service.getRestaurant(req.params);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const createRestaurantData = async (req, res) => {
  try {
    const result = await Service.createRestaurantData(req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const updateRestaurantData = async (req, res) => {
  try {
    const result = await Service.updateRestaurantData(req.params, req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const deleteRestaurantData = async (req, res) => {
  try {
    const result = await Service.deleteRestaurantData(req.params);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

module.exports = {
  getRestaurantData,

  getRestaurantsData,

  createRestaurantData,

  updateRestaurantData,

  deleteRestaurantData,
};
