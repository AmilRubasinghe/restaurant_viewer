const Joi = require("joi");
const { VALIDATION_ERROR } = require("../../helper");
const Constants = require("../metadata/constants");
const locations = Constants.locations;

const createSchema = Joi.object({
  restaurantName: Joi.string().required(),
  registrationNo: Joi.string().required(),
  registrationDate: Joi.date().optional().allow(null),
  contactNumber: Joi.string().required(),
  address: Joi.string().optional().allow(null, ""),
  phiArea: Joi.string()
    .required()
    .valid(...locations),
});

const updateSchema = Joi.object({
  restaurantName: Joi.string().optional(),
  contactNumber: Joi.string().optional(),
  registrationDate: Joi.date().optional().allow(null),
  registrationNo: Joi.string().optional(),
  address: Joi.string().optional().allow(null, ""),
  phiArea: Joi.string()
    .optional()
    .valid(...locations),
  active: Joi.bool().optional(),
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
