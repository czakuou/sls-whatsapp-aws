const Responses = require("../common/templates");
const Dynamo = require("../common/Dynamo");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");

const tableName = process.env.tableName;

exports.handler = async (event) => {
  console.log("event", event);
  console.log("table name", tableName);

  let template_id = uuidv4();
  const data = JSON.parse(event.body);
  data.template_id = template_id;
  console.log("data", data);

  const newTemplate = await Dynamo.write(data, tableName).catch((err) => {
    console.log("error in dynamo write", err);
    return null;
  });

  console.log("newTemplate", newTemplate);
  if (!newTemplate) {
    return Responses._400({ message: "Failed to post data" });
  }
  return Responses._200({ newTemplate });
};
