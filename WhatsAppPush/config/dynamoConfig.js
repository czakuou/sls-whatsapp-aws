const Ajv = require("ajv");
const ajv = new Ajv();

const validator = (schema, data) => {
  const validate = ajv.compile(schema);
  if (!validate(data)) {
    throw new Error(`Configuration calidation error, ${validate.errors}`);
  }
};

const schema = {
  type: "string",
  properties: {
    tableName: { type: "string" },
  },
  required: ["table_name"],
  additionalProperties: false,
};

const tableName = process.env.tableName;

validator(schema, tableName);

module.exports = tableName;
