const TABLE_NAME = "book";
const PRIMARY_KEY = "ISBN";

function createBookModifyQuery(ISBN, cols) {
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

module.exports = createBookModifyQuery;
