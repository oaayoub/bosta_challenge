const { createClient } = require('redis');

require("dotenv").config();

const redisClient = createClient({ url: 'redis://redis:6379' });
module.exports = redisClient;
