const AWS = require("aws-sdk");

const documentClient = new AWS.DynamoClientDB.DocumentClient();

const DynamoClient = {
  async write(data, TableName) {
    const params = {
      TableName,
      Item: data,
    };

    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(
        `There was an error insterting template_id of ${data.template_id} in table ${TableName}`
      );
    }

    return data;
  },

  async update(data, TableName) {
    const params = {
      TableName,
      Item: data,
      ConditionExpression: "user_id = :user_id and template_id = :template_id",
      ExpressionAttributeValues: {
        ":user_id": data.user_id,
        ":template_id": data.template_id,
      },
      ReturnValue: "UPDATED_NEW",
    };

    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(
        `There was an error updating template_id of ${data.template_id} in table ${TableName}`
      );
    }

    return data;
  },

  async delete(data, TableName) {
    const params = {
      TableName,
      Key: {
        user_id: data.user_id,
        template_id: data.template_id,
      },
    };

    const res = await documentClient.delete(params).promise();

    if (!res) {
      throw Error(
        `There was an error deleting template_id of ${data.template_id} in table ${TableName}`
      );
    }

    return data;
  },

  async get(data, TableName) {
    const params = {
      TableName,
      Key: {
        user_id: data.user_id,
        template_id: data.template_id,
      },
    };

    const res = await documentClient.get(params).promise();

    if (!res) {
      throw Error(
        `There was an error getting template_id of ${data.template_id} in table ${TableName}`
      );
    }

    return res.Item;
  },

  async list(user_id, TableName) {
    const params = {
      TableName,
      KeyConditionExpression: "user_id = :user_id",
      ExpressionAttributeValues: {
        ":user_id": user_id,
      },
    };

    const res = await documentClient.query(params).promise();

    if (!res) {
      throw Error(
        `There was an error getting ${user_id} templates in table ${TableName}`
      );
    }

    return res.Items;
  },
};

module.exports = DynamoClient;
