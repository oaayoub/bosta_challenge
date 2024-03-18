const { router: booksController } = require("./books.controller");
const { router: analyticsController } = require("./analytics.controller");
const { router: borrowersController } = require("./borrowers.controller");
const { router: reservationsController } = require("./reservations.controller");
const { router: registerController } = require("./register.controller");
module.exports = {
  booksController,
  analyticsController,
  borrowersController,
  reservationsController,
  registerController,
};
