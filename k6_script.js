import http from 'k6/http';
import { check } from 'k6';

// in options, set multiple stages/ with
// duration (m/s) and
// how many users per second. if target is 20, then 20 VU/sec
export let options = {
  stages: [
    { duration: '10s', target: 0 },
    { duration: '20s', target: 100 }
  ],
};

const randomProdId = Math.floor(Math.random() * 9000000) + 1;
const randomReviewId = Math.floor(Math.random() * 20000000) + 1;
const sortIndex = Math.ceil(Math.random() * 5);
const url = 'http://localhost:3010/reviews/';

export default function () {
  let responses = http.batch([
    ['GET', `${url}${randomProdId}`, null, null],
    ['GET', `${url}${randomProdId}/sort/${sortIndex}`, null, null],
    ['GET', `${url}${randomProdId}/Yes`, null, null],
    ['GET', `${url}${randomProdId}/skinType/Combination`, null, null],
    ['GET', `${url}${randomProdId}/ageRange/17-24`, null, null],
    ['PUT', `${url}${randomReviewId}/upVote`, null, null],
    ['PUT', `${url}${randomReviewId}/downVote`, null, null]
  ]);
  check(responses[0], {
    'main page status was 200': res => res.status === 200,
  });
}