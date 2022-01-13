const Joi = require("joi");

const Schema = {
  createTemplate: Joi.object().keys({
    user_id: Joi.string().required(),
    template_name: Joi.string().required(),
    message: Joi.string().required(),
  }),
};

module.exports = Schema;
