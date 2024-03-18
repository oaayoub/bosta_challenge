const express = require("express")
var jwt = require('jsonwebtoken');
const indexRouter = require('./routers/router')
const { rateLimiter } = require('./middlewares');
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(rateLimiter);

//Routes
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log("Server has started at port " + PORT))
