DROP DATABASE IF EXISTS reviewModule;

CREATE DATABASE reviewModule;

USE reviewModule;

CREATE TABLE users(
  id INT AUTO_INCREMENT NOT NULL,
  username VARCHAR(255),
  passHash VARCHAR(255),
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  birthYear INT NOT NULL,
  city NULL VARCHAR(255),
  states NULL VARCHAR(255),
  skinType VARCHAR(255),
  skinShade VARCHAR(255),
  PRIMARY KEY(id)
);

CREATE TABLE reviews(
  id INT AUTO_INCREMENT NOT NULL,
  productId INT NOT NULL,
  productName VARCHAR(255),
  user_id INT,
  reviewTitle VARCHAR(255),
  reviewText TEXT,
  rating INT NULL,
  bottomLine VARCHAR(200),
  helpfulPeeps INT,
  notHelpfulPeeps INT,
  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
  PRIMARY KEY(id)
);

/* SEEDING QUERIES */

/* SEED USERS
INSERT INTO users (username, passHash, firstName, lastName, birthYear, city, states, skinType, skinShade) VALUES();
*/
INSERT INTO users (username, passHash, firstName, lastName, birthYear, states, skinType, skinShade) VALUES("rambo", "dsf34", "John", "Rambo", 1960, "Florida", "Dry", "Deep");
INSERT INTO users (username, passHash, firstName, lastName, birthYear, city, states, skinType, skinShade) VALUES("o_o", "rg3jio5", "Olive", "Oyle", 1990, "Seattle", "WA", "Oily", "Rich");
INSERT INTO users (username, passHash, firstName, lastName, birthYear, city, states, skinType, skinShade) VALUES("popeye", "lk83nf", "Pop", "Eye", 1980, "Sacramento", "CA", "Combination", "Light");


/* SEED REVIEWS
  INSERT INTO reviews (productName, productId, reviewTitle, reviewText, rating, bottomLine, helpfulPeeps) VALUES();
*/
