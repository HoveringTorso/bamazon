// Load the NPM Package for Inquirer
var inquirer = require("inquirer");
// Load the NPM Package for MySQL
var mysql = require("mysql");

// Create a connection to the MySQL database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "sP!d10rman",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProducts();
});

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    takeOrder();
  });
}

function takeOrder() {
  // Created a series of questions
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "Please input the ID of the product you'd like to purchase"
      },

      {
        type: "input",
        name: "quantity",
        message:
          "Please input the quantity of this product you'd like to purchase"
      }
    ])
    .then(function(desiredOrder) {
      // Store answers for desired order and input them as params for the placeOrder function
      var desiredID = desiredOrder.id;
      var desiredQuantity = desiredOrder.quantity;
      placeOrder(desiredID, desiredQuantity);
    });
}

function placeOrder(productID, productQuantity) {
  connection.query("SELECT * FROM products WHERE id = ?", [productID], function(
    err,
    res
  ) {
    if (err) {
      console.log(err);
    }
    if (productQuantity <= res[0].stock_quantity) {
      var totalCost = res[0].price * productQuantity;
      console.log(
        "Your total cost for " +
          productQuantity +
          " " +
          res[0].product_name +
          " is " +
          totalCost +
          " Thank you!"
      );

      connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?",
        [productQuantity, productID],
        function(err, res) {
          if (err) throw err;
        }
      );
    } else {
      console.log(
        "Insufficient quantity, sorry we do not have enough " +
          res[0].product_name +
          "to complete your order."
      );
    }
    readProducts();
  });
}
