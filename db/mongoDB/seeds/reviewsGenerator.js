/* eslint-disable camelcase */
// This file generates the rest of the review data in our review object
const faker = require('faker');

const skinTypes = ['Combination', 'Normal', 'Dry', 'Oily'];
const ageRanges = ['17-24', '25-30', '31-40', '41-50', '51-60', '60 & Up'];
const skinShades = ['Light', 'Medium', 'Deep', 'Rich'];

// Helper functions to randomly generate review data
const getRandomValue = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min)) + min;
};

const randomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const randomBottomLine = () => {
  const phrase = ['Yes - I would recommend this to a friend', 'No - I would not recommend this to a friend'];
  return `${randomElement(phrase)}`;
};

const randomRating = () => {
  const precision = 10; // 1 decimal place
  const randomNum = Math.floor(Math.random() * (5 * precision - 1 * precision) + 1 * precision) / (1 * precision);
  return randomNum;
};
// Used for testing above function
// for (let i = 0; i < 20; i++){
// console.log(randomRating());
// };

// Will return true 20% of the time
const randomVerifiedBuyer = () => Math.random() < 0.2;

const randomDate = () => {
  const randomValueBetween = (min, max) => Math.random() * (max - min) + min;
  // Start of date range
  const date1 = new Date('01-01-2000').getTime();
  // Current datetime at seed
  const date2 = new Date().getTime();
  if (date1 > date2) {
    return new Date(randomValueBetween(date2, date1)).toLocaleDateString();
  }
  return new Date(randomValueBetween(date1, date2)).toLocaleDateString();
};

let transportMethods = { randomRating, randomBottomLine, randomVerifiedBuyer, randomDate }


module.exports = transportMethods;
