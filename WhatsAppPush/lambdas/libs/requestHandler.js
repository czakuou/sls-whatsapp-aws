const status = require("http-status");

const Responses = {
  handleSucces(data = {}) {
    return {
      statusCode: status.OK,
      body: JSON.stringify(data),
      isBase64Encoded: false,
    };
  },

  handleFailure(statusCode = status.BAD_REQUEST, data = {}) {
    return {
      statusCode,
      body: JSON.stringify(data),
      isBase64Encoded: false,
    };
  },
};

module.exports = Responses;
