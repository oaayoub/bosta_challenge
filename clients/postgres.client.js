//TODO: use env variables

const { Pool } = require("pg");
const postgreClient = new Pool({
  host: "db",
  port: 5432,
  user: "user123",
  password: "password123",
  database: "db123",
});

module.exports = postgreClient;
