const Joi = require("joi");
const { VALIDATION_ERROR } = require("../../helper");
const Constants = require("../metadata/constants");
const locations = Constants.locations;

const createSchema = Joi.object({
  phiName: Joi.string().required(),
  registrationNo: Joi.string().required(),
  email: Joi.string().email().required(),
  contactNumber: Joi.string().required(),
  address: Joi.string().optional().allow(null, ""),
  phiArea: Joi.string()
    .required()
    .valid(...locations),
});

const updateSchema = Joi.object({
  phiName: Joi.string().optional(),
  registrationNo: Joi.string().optional(),
  email: Joi.string().email().optional(),
  contactNumber: Joi.string().optional(),
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
