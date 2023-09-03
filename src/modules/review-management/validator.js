const Joi = require("joi");
const { VALIDATION_ERROR } = require("../../helper");
const Constants = require("../metadata/constants");
const ReviewConstants = require("./constants");
const locations = Constants.locations;
const status = ReviewConstants.status;

const createSchema = Joi.object({
  restaurantId: Joi.string().required(),
  userId: Joi.string().required(),
  reviewDetails: Joi.string().required(),
  phiArea: Joi.string()
    .required()
    .valid(...locations),
  status: Joi.string()
    .required()
    .valid(...status),
});

const updateSchema = Joi.object({
  phiArea: Joi.string()
    .optional()
    .valid(...locations),
  reviewDetails: Joi.string().optional(),
  status: Joi.string()
    .optional()
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

const update = async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

module.exports = {
  create,
  update,
};
