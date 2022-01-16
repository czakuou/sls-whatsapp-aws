const Joi = require("joi");

const Schema = {
  createTemplate: Joi.object().keys({
    user_id: Joi.string().required(),
    template_name: Joi.string().required(),
    message: Joi.string().required(),
  }),

  updateSchema: Joi.object().keys({
    user_id: Joi.string().required(),
    template_id: Joi.string().required(),
    template_name: Joi.string().optional(),
    message: Joi.string().optional(),
  }),

  itemIdSchema: Joi.object().keys({
    user_id: Joi.string().required(),
    template_id: Joi.string().required(),
  }),
};

module.exports = Schema;
