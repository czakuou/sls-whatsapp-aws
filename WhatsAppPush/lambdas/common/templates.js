const status = require("http-status");

const Responses = {
  _200(data = {}) {
    return {
      statusCode: status.OK,
      body: JSON.stringify(data),
      isBase64Encoded: false,
    };
  },

  _400(data = {}) {
    return {
      statusCode: status.INTERNAL_SERVER_ERROR,
      body: JSON.stringify(data),
      isBase64Encoded: false,
    };
  },
};

module.exports = Responses;
