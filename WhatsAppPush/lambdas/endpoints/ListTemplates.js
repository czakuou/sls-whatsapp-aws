const Responses = require("../common/templates");
const Dynamo = require("../../db/Dynamo");
const schema = require("../../db/schemas");

const tableName = process.env.tableName;

exports.handler = async (event) => {
  const { user_id } = event.pathParameters;

  if (!user_id) {
    return Responses._400({
      message: "You have to provide user_id in path parameters",
    });
  }

  const listTemplates = await Dynamo.list(user_id, tableName).catch((err) => {
    console.log("error in dynamo list", err);
    return null;
  });

  if (!listTemplates) {
    return Responses._400({ message: "Failed to get data" });
  }
  return Responses._200({ listTemplates });
};
