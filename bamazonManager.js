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

  manageProducts();
}

function manageProducts() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View Products for Sale',
          'View Low Inventory',
          'Add to Inventory',
          'Add New Product'
        ],
        name: 'actions'
      }
    ])
    .then(function(inquirerResponse) {
      var action = inquirerResponse.actions;

      if (action === 'View Products for Sale') {
        connection.query('SELECT * FROM products', function(err, products) {
          console.log("Here's a list of items:\n");
          for (var i = 0; i < products.length; i++) {
            console.log(
              `Item ID: ${products[i].item_id} | Product Name: ${
                products[i].product_name
              } | Price: $${products[i].price} | Quantity: ${
                products[i].stock_quantity
              }\n`
            );
          }
          connection.end();
        });
      } else if (action === 'View Low Inventory') {
        connection.query('SELECT * FROM products', function(err, products) {
          console.log("Here's a list of low stock items:\n");
          for (var i = 0; i < products.length; i++) {
            if (products[i].stock_quantity < 5) {
              console.log(
                `Item ID: ${products[i].item_id} | Product Name: ${
                  products[i].product_name
                } | Price: $${products[i].price} | Quantity: ${
                  products[i].stock_quantity
                }\n`
              );
            }
          }
          connection.end();
        });
      } else if (action === 'Add to Inventory') {
        connection.query('SELECT * FROM products', function(err, products) {
          for (var i = 0; i < products.length; i++) {
            console.log(
              `Item ID: ${products[i].item_id} | Product Name: ${
                products[i].product_name
              } | Quantity: ${products[i].stock_quantity}\n`
            );
          }

          inquirer
            .prompt([
              {
                type: 'input',
                message:
                  'Enter the item id that you like to update its stock quantity',
                name: 'item_id'
              },
              {
                type: 'input',
                message: 'Enter the quantity',
                name: 'quantity'
              }
            ])
            .then(function(data) {
              for (var i = 0; i < products.length; i++) {
                if (products[i].item_id == data.item_id) {
                  var newStock =
                    parseInt(data.quantity) +
                    parseInt(products[i].stock_quantity);
                  console.log(`stock availability ${newStock}`);
                  var stockUpdate = [
                    { stock_quantity: newStock },
                    { item_id: products[i].item_id }
                  ];
                  var query = connection.query(
                    'UPDATE products SET ? WHERE ?',
                    stockUpdate,
                    function(err, res) {
                      if (err) {
                        console.log(err);
                      }
                      console.log("Item's stock updated");
                    }
                  );
                  connection.end();
                }
              }
            });
        });
      } else if (action === 'Add New Product') {
        inquirer
          .prompt([
            {
              type: 'input',
              message: 'Enter the Product Name',
              name: 'product'
            },
            {
              type: 'input',
              message: 'Enter the Price',
              name: 'price'
            },
            {
              type: 'input',
              message: 'Enter the Department ID',
              name: 'department_id'
            },
            {
              type: 'input',
              message: 'Enter the Quantity',
              name: 'quantity'
            }
          ])
          .then(function(data) {
            connection.query(
              'INSERT INTO products SET ?',
              {
                product_name: data.product,
                price: data.price,
                department_id: data.department_id,
                stock_quantity: data.quantity,
                product_sales: 0
              },
              function(err, res) {
                console.log(err);
                console.log('New product item has updated to the inventory!');
              }
            );
            connection.end();
          });
      }
    });
}
