const Joi = require("joi");
const { VALIDATION_ERROR } = require("../../helper");

const loginSchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});

const passwordRestSchema = Joi.object({
  userName: Joi.string().required(),
  currentPassword: Joi.string().required(),
});

const login = async (req, res, next) => {
  try {
    await loginSchema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

module.exports = {
  login,
};
