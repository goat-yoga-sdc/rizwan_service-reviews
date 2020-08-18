DROP DATABASE IF EXISTS reviews_db;

CREATE DATABASE reviews_db;

\c reviews_db;

DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products(
  id INTEGER PRIMARY KEY,
  productName VARCHAR(255)
);

DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE reviews(
  review_id INTEGER PRIMARY KEY,
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