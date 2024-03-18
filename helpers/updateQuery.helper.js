function createBorrowerModifyQuery(email, updates) {
  const TABLE_NAME = "borrower";
  const PRIMARY_KEY = "email";
  // Setup static beginning of query
  var query = [`UPDATE ${TABLE_NAME}`];
  query.push("SET");

  // Create another array storing each set command
  // and assigning a number value for parameterized query
  var set = [];
  var params = [];
  var index = 1; // Parameter index starts from 1
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

  console.log("f: 1");
  params.push(email); // Add email parameter value

  console.log("f: 2");
  // Return an object with the query string and parameters
  return {
    text: query.join(" "),
    values: params,
  };
}

function createBookModifyQuery(ISBN, cols) {
  const TABLE_NAME = "book";
  const PRIMARY_KEY = "ISBN";
  // Setup static beginning of query
  var query = [`UPDATE ${TABLE_NAME}`];
  query.push("SET");

  // Create another array storing each set command
  // and assigning a number value for parameterized query
  var set = [];
  var params = [];
  var index = 1; // Parameter index starts from 1
  Object.keys(cols).forEach(function (key) {
    if (key !== PRIMARY_KEY && cols[key] !== undefined) {
      if (
        (key === "available_quantity" && !isNaN(cols[key])) ||
        key !== "available_quantity"
      ) {
        set.push(key + " = $" + index);
        params.push(cols[key]);
        index++;
      }
    }
  });
  query.push(set.join(", "));

  // Add the WHERE statement to look up by id
  query.push(`WHERE ${PRIMARY_KEY} = $${index}`); // Use PRIMARY_KEY variable instead of TABLE_NAME
  params.push(ISBN); // Add ISBN parameter value

  // Return an object with the query string and parameters
  return {
    text: query.join(" "),
    values: params,
  };
}

module.exports = { createBorrowerModifyQuery, createBookModifyQuery };
