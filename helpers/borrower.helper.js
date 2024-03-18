const { text } = require("express");

const TABLE_NAME = "borrower";
const PRIMARY_KEY = "email";

function createBorrowerModifyQuery(email, updates) {
  // Setup static beginning of query
  var query = [`UPDATE ${TABLE_NAME}`];
  query.push("SET");

  // Create another array storing each set command
  // and assigning a number value for parameterized query
  var set = [];
  var params = [];
  var index = 1; // Parameter index starts from 1
  console.log("omar", email, updates);
  Object.keys(updates).forEach(function (key) {
    if (key !== PRIMARY_KEY && updates[key] !== undefined) {
      set.push(key + " = $" + index);
      params.push(updates[key]);
      index++;
    }
  });

  query.push(set.join(", "));

  // Add the WHERE statement to look up by id
  query.push(`WHERE ${PRIMARY_KEY} = $${index}`); // Use PRIMARY_KEY variable instead of TABLE_NAME
  
  console.log("f: 1")
  params.push(email); // Add email parameter value

  console.log("f: 2")
  // Return an object with the query string and parameters
  return {
    text: query.join(" "),
    values: params,
  };
}

module.exports = createBorrowerModifyQuery;
