const status = require("http-status");

const Responses = {
  _200(data = {}) {
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: status.SUCCESSFUL,
      body: JSON.stringify(data),
    };
  },

  _400(data = {}) {
    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: status.CLIENT_ERROR,
      body: JSON.stringify(data),
    };
  },
};

module.exports = Responses;
