const express = require("express");
var jwt = require("jsonwebtoken");
const indexRouter = require("./routers/router");
const { rateLimiter, authenticator,redisCacheMiddleware } = require("./middlewares");
const app = express();
const {redisClient} = require("./clients/index");

(async () => {
  await redisClient.client.connect();
})();
redisClient.client.on('connect', () => console.log('::> Redis Client Connected'));
redisClient.client.on('error', (err) => console.log('<:: Redis Client Error', err));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(authenticator);
app.use(rateLimiter);

//Routes
app.use("/", indexRouter);

const PORT = process.env.PORT || process.env.APP_PORT;
app.listen(PORT, console.log("Server has started at port " + PORT));
