const Responses = require("../common/templates");
const Dynamo = require("../../db/Dynamo");
const schema = require("../../db/schemas");

const tableName = process.env.tableName;

exports.handler = async (event) => {
  const { template_id, user_id } = event.pathParameters;

  if (!template_id || !user_id) {
    return Responses._400({
      message: "You have to provide user_id and template_id in path parameters",
    });
  }

  if (!event.body) {
    return Responses._400({ message: "You have to provide a body" });
  }
  const data = JSON.parse(event.body);

  data.template_id = template_id;
  data.user_id = user_id;

  const { error } = schema.updateSchema.validate(data);
  if (error) {
    return Responses._400({ message: error.details[0].message });
  }

  const updatedTemplate = await Dynamo.update(data, tableName).catch((err) => {
    console.log("error in dynamo update", err);
    return null;
  });

  if (!updatedTemplate) {
    return Responses._400({ message: "Failed to update data" });
  }
  return Responses._200({ updatedTemplate });
};
