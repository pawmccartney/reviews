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
    memberLocation: String,
    memberContributions: Number,
    memberHelpful: Number
  },
  reviewInfo: {
    reviewDate: String,
    reviewTitle: String,
    reviewText: String,
    reviewTripType: String,
    reviewPictures: {picture1: String, picture2: String, picture3: String, picture4: String},
    reviewRatings: Array
  },
  responderInfo: {
    hotelId: Number,
    responderOrg: String,
    responderPicture: String,
    responderClose: String,
    responderDate: String,
    responderName: String,
    responderPosition: String,
    responderText: String
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
};

var getReviewsByHotel = (hotelId) => {
  return new Promise((resolve, reject) => {
    Review.find({"responderInfo.hotelId": hotelId}).exec((err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    })
  })
};

const update = (details) => {
  return new Promise((resolve, reject) => {
    Review.findByIdAndUpdate({_id: details.reviewId}, {'$set': {'reviewInfo.reviewText': details.newText}}, (err, result) => {
      if (err) reject(err);
      resolve(result);
    })
  });
};

const remove = (reviewId) => {
  return new Promise((resolve, reject) => {
    Review.findByIdAndDelete(revewId, (err, result) => {
      if (err) reject(err);
      resolve(result);
    })
  });
}

const getReview = (reviewId) => {
  return  new Promise((resolve, reject) => {
    Review.findById(reviewId, (err, result) =>{
      if (err) reject(err);
      resolve(result);
    })
  });
}
module.exports.update = update;
module.exports.save = save;
module.exports.getReviewsByHotel = getReviewsByHotel;
module.exports.remove = remove;
module.exports.getReview = getReview;