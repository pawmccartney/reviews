const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/review', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let reviewSchema = mongoose.Schema({
  memberInfo: {
    memberId: Number,
    memberImg: String,
    memberUserName: String,
    memberContributions: Number,
    memberHelpful: Number
  },
  reviewInfo: {
    reviewDate: String,
    reviewTitle: String,
    reviewText: String,
    reviewTripType: String,
    reviewPictures: {picture1: String, picture2: String},
    reviewRatings: Number,
    helpful: Number
  },
  responderInfo: {
    responderOrg: String,
    responderName: String,
    responderPosition: String,
    responderPicture: String,
    responderDate: String,
    responderText: String,
    responderClose: String
  }
});

let Review = mongoose.model('Review', reviewSchema);

var save = (review) => {
  return new Promise((resolve, reject) => {
    Review.create(review, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}

var getAllReviews = () => {
  return new Promise((resolve, reject) => {
    Review.find({}).exec((err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    })
  })
}

module.exports.save = save;
module.exports.getAllReviews = getAllReviews;