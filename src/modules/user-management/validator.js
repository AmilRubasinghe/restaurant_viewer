const Joi = require("joi");
const { VALIDATION_ERROR } = require("../../helper");

const updateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  active: Joi.bool().optional(),
  contactNumber: Joi.bool().optional(),
  role: Joi.string().optional(),
});

const update = async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

module.exports = {
  update,
};
