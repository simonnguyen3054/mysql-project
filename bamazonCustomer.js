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
    'SELECT item_id, product_name, price FROM products',
    function(err, products) {
      console.log(products);
    }
  );
}
