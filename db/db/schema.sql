DROP DATABASE IF EXISTS reviewModule;

CREATE DATABASE reviewModule;

USE reviewModule;

CREATE TABLE users(
  id INT AUTO_INCREMENT NOT NULL,
  username VARCHAR(255),
  passHash VARCHAR(255),
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  ageRange VARCHAR(100),
  place VARCHAR(255),
  skinType VARCHAR(255),
  skinShade VARCHAR(255),
  PRIMARY KEY(id)
);

CREATE TABLE reviews(
  reviewId INT AUTO_INCREMENT NOT NULL,
  productId INT NOT NULL,
  productName VARCHAR(255),
  user_id INT,
  reviewTitle VARCHAR(255),
  reviewText TEXT,
  rating FLOAT (2, 1) NULL,
  bottomLine VARCHAR(200),
  votes_down INT,
  votes_up INT,
  verified_buyer BOOLEAN,
  reviewTime VARCHAR(100),
  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
  PRIMARY KEY(reviewId),
  FULLTEXT (productName, reviewTitle, reviewText, bottomLine)
);

-- CREATE TABLE products(
--   productId INT NOT NULL,
--   productName VARCHAR(255),
--   reviewId
--
--   FOREIGN KEY (reviewId)
--    REFERENCES reviews(reviewId)
--    ON DELETE CASCADE,
--   PRIMARY KEY(productId)
--  );

--
--  CREATE TABLE reviews(
--   reviewId num
--   reviewTitle VARCHAR(255),
--   reviewText TEXT,
--   rating FLOAT (2, 1) NULL,
--   bottomLine VARCHAR(200),
--   votes_down INT,
--   votes_up INT,
--   verified_buyer BOOLEAN,
--   reviewTime VARCHAR(100),
--   PRIMARY KEY(reviewId),
--   FULLTEXT (productName, reviewTitle, reviewText, bottomLine)
-- );
