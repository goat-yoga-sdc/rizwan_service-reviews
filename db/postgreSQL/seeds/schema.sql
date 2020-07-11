DROP DATABASE IF EXISTS reviewModule;

CREATE DATABASE reviewModule;

\c reviewModule;

DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products(
  id INTEGER PRIMARY KEY,
  productName VARCHAR(255)
);

-- cascase option allows removal foreign key, because it depends on
DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE reviews(
  id INTEGER PRIMARY KEY,
  product_id INTEGER,
  reviewTitle VARCHAR(255),
  reviewText TEXT,
  rating DECIMAL NULL,
  bottomLine VARCHAR(200),
  votes_down SMALLINT,
  votes_up SMALLINT,
  verified_buyer BOOLEAN,
  reviewTime VARCHAR(100),
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  ageRange VARCHAR(100),
  place VARCHAR(255),
  skinType VARCHAR(255),
  skinShade VARCHAR(255),
  FOREIGN KEY (product_id)
    REFERENCES products(id)
);

-- COPY products(id,productName)
-- FROM '/Users/rizwanchoudhury/Desktop/Hack Reactor/Hack Reactor Actual Course Projects/SDC/Reviews-module/DB/postgreSQL/seeds/products.csv' DELIMITER ',' CSV HEADER;

COPY reviews