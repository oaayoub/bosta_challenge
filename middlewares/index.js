const { rateLimiter } = require("./rateLimiter.middleware");
const { authenticator } = require("./authenticator.middleware");
module.exports = { rateLimiter, authenticator };
