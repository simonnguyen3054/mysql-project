var mysql = require('mysql');
var inquirer = require('inquirer');
var cTable = require('console.table');

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

  supervisor();
}

function supervisor() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View Product Sales by Department', 'Create New Department'],
        name: 'actions'
      }
    ])
    .then(function(data) {
      if (data.actions === 'View Product Sales by Department') {
        connection.query(
          'SELECT id, dept_name, SUM(product_sales) AS total_revenue, SUM(product_sales)-over_head_costs AS total_profit FROM departments LEFT JOIN products ON departments.id = products.dept_id GROUP BY id;',
          function(err, res) {
            console.log('Display Sales...\n');
            if (err) {
              throw err;
            }
            var table = cTable.getTable(res);
            console.log(table);
          }
        );
        connection.end();
      } else {
        inquirer
          .prompt([
            {
              type: 'input',
              message: 'Enter the New Department Name',
              name: 'department'
            },
            {
              type: 'input',
              message: 'Enter the over head cost',
              name: 'overhead_cost'
            }
          ])
          .then(function(data) {
            connection.query(
              'INSERT INTO departments SET ?',
              {
                dept_name: data.department,
                over_head_costs: data.overhead_cost
              },
              function(err, res) {
                if (err) {
                  console.log(err);
                }
                console.log(data.department);
                console.log(data.overhead_cost);
                console.log('New department name has created!');
              }
            );
            connection.end();
          });
      }
    });
}
