# What is bamazon project?
bamazon is a Amazon-like storefront project that allows user/owner to interact with the product data through command line interface.

# How doe bamzon work?
Thre are thee node commands in this project that the user and owner has access to.
``` node bamazonCustomer.js ```
- This command list out all products the store is currently carried.
- Customer is prompted to enter a product ID and number of purchase units.
- Using MySQL, the program will take in customer's input and update the products table.
``` node bamazonManager.js ```
- This command list out four options for the manager to interact with (View Products for Sale, View Low Inventory, Add to Inventory, and Add New Product).
  - View Products for Sale: List out items for sale
  - List out low inventory items that are less than 5 in stock
  - Add to Inventory: Stock up the items that are low in inventory
  - Add New Product: Add a new product line to the existing department
``` node bamazonSupervisor.js ```
- This command list out two options for the supervisor to interact with (View Product Sales by Department, Create New Department).
 - View Product Sales by Department: Make a new table listing out the department, total revenue, and total profit.
 - Create New Department: This allows the supervisor to create a new department. 
# How to set up the project?
1. Download the github repo
2. Install the dependencies ``` npm install ```
3. Run the data ``` source bamazon_db.sql ```
