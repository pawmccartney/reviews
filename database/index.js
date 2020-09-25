const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useMongoClient: true});

let reviewSchema = mongoose.Schema({
  memberInfo: {
    memberId: Number,
    memberImg: String,
    memberUserName: String,
  },
  reviewInfo: {
    reviewDate: Number,
    reviewText: String,
    reviewPictures: {picture1: String, picture2: String},
    contribution: Number,
    helpful: Number
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

module.exports.save = save;