const axios = require('axios');

test('sanity check', () => {
  expect(true).toBe(true);
});

// test("clien't get request is met with an array", () => {
//   axios.get('http://localhost:4003/reviews')
//     .then(result => {
//       expect(Array.isArray(result.data)).toBe(true);
//     }).catch(err => {
//       throw Error('ERROR: second test');
//     })
// });

// test("expects data from server to have the reviewer's name and review", () => {
//   axios.get('http://localhost:4003/reviews')
//     .then(result => {
//       let currReview = result.data[0];
//       let reviewer = currReview['memberInfo']['memberUserName'];
//       let review = currReview['reviewInfo']['reviewText'];

//       expect(reviewer).toBeTruthy();
//       expect(review).toBeTruthy();
//     }).catch(err => {
//       throw Error('ERROR: third test');
//     })
// });


// test(", (done) => {
//   axios.get('http://localhost:4003/reviews')
//     .then(result => {

//     }).catch(err => {
//       done(err);
//     })
// });