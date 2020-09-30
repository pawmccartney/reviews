const axios = require('axios');

test('sanity check', () => {
  expect(true).toBe(true);
});

test("clien't get request is met with an array", (done) => {
  axios.get('http://localhost:4003/reviews')
    .then(result => {
      expect(Array.isArray(result.data)).toBe(true);
      done();
    }).catch(err => {
      done(err);
    })
});

test("expects data from server to have the reviewer's name and review", (done) => {
  axios.get('http://localhost:4003/reviews')
    .then(result => {
      let currReview = result.data[0];
      let reviewer = currReview['memberInfo']['memberUserName'];
      let review = currReview['reviewInfo']['reviewText'];

      expect(reviewer).toBeTruthy();
      expect(review).toBeTruthy();
      done();
    }).catch(err => {
      done(err);
    })
});

