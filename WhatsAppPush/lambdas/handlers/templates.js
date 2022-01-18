const httpStatus = require("http-status");
const { v4: uuidv4 } = require("uuid");

const Responses = require("../libs/requestHandler");
const validator = require("../libs/validator");
const schema = require("../../db/schemas");
const DynamoClient = require("../../db/DynamoClient");
const tableName = require("../../config/dynamoConfig");

const templateController = {
  async post(event, context) {
    context.callbackWaitsForEmptyEventLoop = false;

    // TODO add idemoitent_key
    if (!event.body) {
      return Responses.handleFailure({ message: "You have to provide a body" });
    }
    const data = JSON.parse(event.body);

    validator(schema.createTemplate, data);

    data.template_id = uuidv4();

    try {
      const newTemplate = await DynamoClient.write(data, tableName);

      return Responses.handleSucces({ newTemplate });
    } catch (InternalServerError) {
      return Responses.handleFailure(
        httpStatus.INTERNAL_SERVER_ERROR,
        InternalServerError.stack
      );
    }
  },

  async delete(event, context) {
    context.callbackWaitsForEmptyEventLoop = false;

    const { template_id, user_id } = event.pathParameters;

    if (!template_id || !user_id) {
      return Responses.handleFailure({
        message:
          "You have to provide user_id and template_id in path parameters",
      });
    }

    const data = { template_id, user_id };

    validator(schema.itemIdSchema, data);

    try {
      const deletedTemplate = await DynamoClient.delete(data, tableName);

      return Responses.handleSucces({ message: "OK" });
    } catch (InternalServerError) {
      return Responses.handleFailure(
        httpStatus.INTERNAL_SERVER_ERROR,
        InternalServerError.stack
      );
    }
  },

  async update(event, context) {
    context.callbackWaitsForEmptyEventLoop = false;

    const { template_id, user_id } = event.pathParameters;

    if (!template_id || !user_id) {
      return Responses.handleFailure({
        message:
          "You have to provide user_id and template_id in path parameters",
      });
    }

    if (!event.body) {
      return Responses.handleFailure({ message: "You have to provide a body" });
    }
    const data = JSON.parse(event.body);

    data.template_id = template_id;
    data.user_id = user_id;

    validator(schema.updateSchema, data);

    try {
      const updatedTemplate = await DynamoClient.update(data, tableName);

      return Responses.handleSucces({ updatedTemplate });
    } catch (InternalServerError) {
      return Responses.handleFailure(
        httpStatus.INTERNAL_SERVER_ERROR,
        InternalServerError.stack
      );
    }
  },

  async get(event, context) {
    context.callbackWaitsForEmptyEventLoop = false;

    const { template_id, user_id } = event.pathParameters;

    if (!template_id || !user_id) {
      return Responses.handleFailure({
        message:
          "You have to provide user_id and template_id in path parameters",
      });
    }

    const data = { template_id, user_id };

    validator(schema.itemIdSchema, data);

    try {
      const detailsTemplate = await DynamoClient.get(data, tableName);

      return Responses.handleSucces({ detailsTemplate });
    } catch (InternalServerError) {
      return Responses.handleFailure(
        httpStatus.INTERNAL_SERVER_ERROR,
        InternalServerError.stack
      );
    }
  },

  async list(event, context) {
    context.callbackWaitsForEmptyEventLoop = false;

    const { user_id } = event.pathParameters;

    if (!user_id) {
      return Responses.handleFailure({
        message: "You have to provide user_id in path parameters",
      });
    }

    try {
      const listTemplates = await DynamoClient.list(user_id, tableName);

      return Responses.handleSucces({ listTemplates });
    } catch (InternalServerError) {
      return Responses.handleFailure(
        httpStatus.INTERNAL_SERVER_ERROR,
        InternalServerError.stack
      );
    }
  },
};

exports.postHandler = templateController.post;
exports.deleteHandler = templateController.delete;
exports.getHandler = templateController.get;
exports.listHandler = templateController.list;
exports.updateHandler = templateController.update;
