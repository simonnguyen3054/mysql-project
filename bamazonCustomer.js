var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'password',
  database: 'bamazon_db'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected: ' + connection.threadId + '\n');
  runApp();
});

function runApp() {
  console.log('App is running...');

  connection.query(
    'SELECT item_id, product_name, price, stock_quantity FROM products',
    function(err, products) {
      console.log("Here's a list of items we carry in our store:\n");
      for (var i = 0; i < products.length; i++) {
        console.log(
          `Item ID: ${products[i].item_id} | Product Name: ${
            products[i].product_name
          } | Price: $${products[i].price}\n`
        );
      }

      inquirer
        .prompt([
          {
            type: 'input',
            name: 'product_id',
            message: 'Input a product id that you would like to buy:'
          },
          {
            type: 'input',
            name: 'quantity',
            message: 'How many units would you like to buy?'
          }
        ])
        .then(function(data) {
          for (var i = 0; i < products.length; i++) {
            if (
              products[i].item_id == data.product_id &&
              products[i].stock_quantity > data.quantity
            ) {
              console.log('We have enough stock', );
              console.log(`Order Summary: Quantity = ${data.quantity} | Total Price: $${data.quantity * products[i].price}`);
              var remaining_stock_quantity = products[i].stock_quantity - data.quantity;
              var query = connection.query(
                'UPDATE products SET ? WHERE ?',
                [
                  {stock_quantity: remaining_stock_quantity},
                  {item_id: data.product_id}
                ],
                function(err, res) {
                  console.log("Thank you for your business!");
                }
              );
            }
          }
          connection.end();
        });
    }
  );
}
