const AWS = require("aws-sdk");

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
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
};

module.exports = Dynamo;
