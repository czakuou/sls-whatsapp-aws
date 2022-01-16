const Ajv = require("ajv");
const Responses = require("./requestHandler");

const ajv = new Ajv();

const validator = (schema, data) => {
  const validate = ajv.compile(schema);
  if (!validate(data)) {
    return Responses.handleFailure(`Data validation error, ${validate.errors}`);
  }
};

module.exports = validator;
