import http from 'k6/http';
import { check } from 'k6';

// in options, set multiple stages/ with
// duration (m/s) and
// how many users per second. if target is 20, then 20 VU/sec

// ramp up slowly until i get 1000 rps
export let options = {
  stages: [
    { duration: '10s', target: 50 },
    { duration: '20s', target: 500 },
    { duration: '2m', target: 500 },
    { duration: '10s', target: 0 }
  ],
  thresholds: {
    // the rate of successful checks should be higher than 90%
    'checks': ['rate>0.9']
  }
};

// product id between 8000000 and 9000000. Last ~10% of products in DB
const prodId = Math.floor(Math.random() * (9000000 - 8000000)) + 8000000;
// Last ~10% of reviews in DB
const reviewId = Math.floor(Math.random() * (22500000 - 20000000)) + 20000000;
const sortIndex = Math.ceil(Math.random() * 5);
const url = 'http://localhost:3010/reviews/';

export default function () {
  http.get(`${url}${prodId}`);
  http.get(`${url}${prodId}/sort/${sortIndex}`);
  http.get(`${url}${prodId}/Yes`);
  http.get(`${url}${prodId}/skinType/Combination`);
  http.get(`${url}${prodId}/ageRange/17-24`);
  http.put(`${url}${reviewId}/upVote`);
  http.put(`${url}${reviewId}/downVote`);
}