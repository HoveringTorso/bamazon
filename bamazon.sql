DROP DATABASE IF EXISTS bamazon;
-- Create the database bamazon and specifiy it for use.
CREATE DATABASE bamazon;
USE bamazon;
-- Create the table actors.
CREATE TABLE products (
  id int AUTO_INCREMENT,
  product_name varchar(30) NOT NULL,
  department_name varchar(30) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(20) NOT NULL,
  PRIMARY KEY(id)
);
-- Insert a set of records.
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Guitar", "Strings", 499.99, 40),
		("Bass", "Strings", 699.99, 34),
        ("Violin", "Strings", 189.99, 23),
        ("Piano", "Strings", 2999.99, 5),
        ("Tabla", "Percussion", 89.99, 19),
        ("Drumset", "Percussion", 649.99, 12),
        ("Marching Snare Drum", "Percussion", 159.99, 38),
        ("Tuba", "Brass", 2299.99, 2),
        ("Trumpet", "Brass", 279.99, 38),
        ("Flute", "Woodwinds", 199.99, 18)