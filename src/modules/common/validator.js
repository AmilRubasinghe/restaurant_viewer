const Joi = require("joi");
const { VALIDATION_ERROR } = require("../../helper");

const loginSchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});

const createSchema = Joi.object({
  name: Joi.string().required(),
  userName: Joi.string().required(),
  password: Joi.string().required(),
  contactNumber: Joi.string().required(),
  email: Joi.string().required(),
  role: Joi.string().optional(),
  phiReference: Joi.number().integer().optional(),
});

const passwordResetSchema = Joi.object({
  userName: Joi.string().required(),
  oldPassword: Joi.string().required(),
  currentPassword: Joi.string().required(),
});

const forgetPasswordSchema = Joi.object({
  userName: Joi.string().required(),
});

const create = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

const passwordReset = async (req, res, next) => {
  try {
    await passwordResetSchema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    await forgetPasswordSchema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

const login = async (req, res, next) => {
  try {
    await loginSchema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

module.exports = {
  create,
  login,
  passwordReset,
  forgetPassword,
};
