const Responses = require("../common/templates");
const Dynamo = require("../../db/Dynamo");
const { v4: uuidv4 } = require("uuid");
const schema = require("../../db/schemas");

const tableName = process.env.tableName;

exports.handler = async (event) => {
  // TODO add idemoitent_key
  if (!event.body) {
    return Responses._400({ message: "You have to provide a body" });
  }
  const data = JSON.parse(event.body);
  const { error } = schema.createTemplate.validate(data);

  if (error) {
    return Responses._400({ message: error.details[0].message });
  }

  data.template_id = uuidv4();

  const newTemplate = await Dynamo.write(data, tableName).catch((err) => {
    console.log("error in dynamo write", err);
    return null;
  });

  if (!newTemplate) {
    return Responses._400({ message: "Failed to post data" });
  }
  return Responses._200({ newTemplate });
};
