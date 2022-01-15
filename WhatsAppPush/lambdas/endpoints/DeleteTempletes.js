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

  const data = {
    template_id: template_id,
    user_id: user_id,
  };

  const { error } = schema.deleteSchema.validate(data);
  if (error) {
    return Responses._400({ message: error.details[0].message });
  }

  const deletedTemplate = await Dynamo.delete(data, tableName).catch((err) => {
    console.log("error in dynamo delete", err);
    return null;
  });

  if (!deletedTemplate) {
    return Responses._400({ message: "Failed to delete data" });
  }
  return Responses._200({ message: "OK" });
};
