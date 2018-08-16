DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(255) NOT NULL,
  over_head_costs DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO departments (dept_name, over_head_costs)
VALUES ("Fashion", 12000.00), ("Tech", 25000.00), ("Beauty", 8000.00);

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  dept_id INT NOT NULL,
  stock_quantity INT NOT NULL,
  product_sales DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (item_id),
  FOREIGN KEY (dept_id) REFERENCES departments(id)
);

INSERT INTO products (product_name, price, dept_id, stock_quantity, product_sales)
VALUES
("Rugged Mile Denim Men's Slim Fit Indigo Performance Jean", 39.11, 1, 57, 0.00),
("Noctflos Women's Contrast Floral Fit", 12.59, 1, 12, 1000.00),
("Hudson Baby Animal Plush Bathrobe, Pretty Elephant", 10.99, 1, 2, 500.00),
("HP ENVY", 859.00, 2, 5, 50000.00),
("Apple iPhone 6 GSM Unlocked, 64 GB - Space Gray", 186.11, 2, 2, 1000.00),
("Amazon Cloud Cam Security Camera, Works with Alexa", 119.99, 2, 200, 200.00),
("Clarisonic Gentle Radiance Foaming Milk", 17.96, 3, 100, 50.00),
("Clarisonic Smart Profile Uplift 2-in-1 Cleansing", 349.00, 3, 5, 1000.00),
("Clarisonic Glow Getter Set", 68.32, 3, 8, 500.00),
("Clarisonic Deep Pore Facial Cleansing", 24.30, 3, 90, 100.00);
