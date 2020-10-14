const axios = require('axios');
const request = require('superTest');
const app = require('../server/app');
const db = require('../database/index');

test('sanity check', () => {
  expect(true).toBe(true);
});

var  reviewIdPlaceholder;
var reviewPlaceholder;
describe("CRUD operation interface", () => {

  describe('responds to GET requests', () => {

    test("client's get request is met with an array", (done) => {
      return request(app)
        .get('/hotel/hotel3')
        .then(result => {
          expect(Array.isArray(result.body)).toBe(true);
          done();
        }).catch(err => {
          done(err);
        })
    });

    test("expects data from server to have the reviewer's name and review", (done) => {
      return request(app)
        .get('/hotel/hotel4')
        .then(result => {
          let currReview = result.body[0];
          let reviewer = currReview['memberInfo']['memberUserName'];
          let review = currReview['reviewInfo']['reviewText'];
          expect(reviewer).toBeTruthy();
          expect(review).toBeTruthy();
          done();
        }).catch(err => {
          done(err);
        })
    });

  })

  describe('handles POST operations', () => {

    test('a post request with a new review creates a new entry in the database', (done) => {
      let review = {
        memberInfo: {
          memberId: 15,
          memberImg: 'https://adcobareviews.s3-us-west-1.amazonaws.com/a30.jpg',
          memberUserName: 'ascasc',
          memberLocation: 'Rochester',
          memberContributions: 5,
          memberHelpful: 6
        },
        reviewInfo: {
          reviewDate: 'This is such an amazing and great for usage',
          reviewTitle: 'wow wow wow',
          reviewText: 'This product was great!',
          reviewTripType: 'wow wow wow',
          reviewPictures: {picture1: 'https://adcobareviews.s3-us-west-1.amazonaws.com/a30.jpg', picture2: 'https://adcobareviews.s3-us-west-1.amazonaws.com/a30.jpg', picture3: 'https://adcobareviews.s3-us-west-1.amazonaws.com/a30.jpg', picture4: 'https://adcobareviews.s3-us-west-1.amazonaws.com/a30.jpg'},
          reviewRatings: ['hello', 'hello', 'hello']
        },
        responderInfo: {
          hotelId: 2,
          responderOrg: 'https://adcobareviews.s3-us-west-1.amazonaws.com/a30.jpg',
          responderPicture: 'https://adcobareviews.s3-us-west-1.amazonaws.com/a30.jpg',
          responderClose: 'Very',
          responderDate: '10-20-2020',
          responderName: 'Ahmed',
          responderPosition: 'Manager',
          responderText: 'wow wow wow'
        }
      };
      return request(app)
        .post('/')
        .send({review: review})
        .then((resp) => {
          expect(resp).toBeDefined();
          expect(resp.body.responderInfo).toBeDefined();
          expect(resp.body.reviewInfo).toBeDefined();
          expect(resp.body.memberInfo).toBeDefined();
          reviewIdPlaceholder = resp.body._id;
          reviewPlaceholder = resp.body._doc;
          done();
        })
        .catch((err) => {
          done(err);
        })
    })
  })
});

describe('updates review', () => {
  beforeEach(() => {
    return request(app)
      .put(`/${reviewIdPlaceholder}`)
      .send({reviewId: reviewIdPlaceholder, newText: 'Changed my mind. THis is not a good product'})
      .catch((err) => {
        console.error(err);
      })
  });
  test('Updates review text on a PUT operation', (done) => {
    db.getReview(reviewIdPlaceholder)
      .then((result) => {
        console.log(result)
        let newText =  result.reviewInfo.reviewText;
        expect(result.reviewInfo).toBeDefined();
        expect(newText).toBeDefined();
        expect(newText).toMatch('Changed my mind. THis is not a good product');
        done();
      })
      .catch((err) => {
        done(err);
      })
  })
})

