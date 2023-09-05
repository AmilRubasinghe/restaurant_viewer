const Joi = require("joi");
const { VALIDATION_ERROR } = require("../../helper");
const Constants = require("../metadata/constants");
const ReviewConstants = require("./constants");
const locations = Constants.locations;
const status = ReviewConstants.status;

const createSchema = Joi.object({
  restaurantId: Joi.string().required(),
  reviewDetails: Joi.string().required(),
  phiArea: Joi.string()
    .required()
    .valid(...locations),
  status: Joi.string()
    .required()
    .valid(...status),
});

const create = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

module.exports = {
  create,
};
