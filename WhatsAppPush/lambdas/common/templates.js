const Responses = {
  _200(data = {}) {
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      isBase64Encoded: false,
    };
  },

  _400(data = {}) {
    return {
      statusCode: 400,
      body: JSON.stringify(data),
      isBase64Encoded: false,
    };
  },
};

module.exports = Responses;
