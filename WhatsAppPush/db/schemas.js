const Schema = {
  createTemplate: {
    properties: {
      user_id: { type: "string" },
      template_name: { type: "string" },
      message: { type: "string" },
    },
    required: ["user_id", "template_name", "message"],
    additionalProperties: false,
  },

  updateSchema: {
    properties: {
      user_id: { type: "string" },
      template_id: { type: "string" },
      template_name: { type: "string" },
      message: { type: "string" },
    },
    required: ["user_id", "template_id", "template_name", "message"],
    additionalProperties: false,
  },

  itemIdSchema: {
    properties: {
      user_id: { type: "string" },
      template_id: { type: "string" },
    },
    required: ["user_id", "template_id"],
    additionalProperties: false,
  },
};

module.exports = Schema;
