const db = require('../database/index');

const addReview = function(data, next) {
    let { memberInfo, reviewInfo, responderInfo } = data;
    let review = {
        memberInfo: memberInfo,
        reviewInfo: reviewInfo,
        responderInfo: responderInfo
    };
    
    db.save(review)
      .then((resp) => {
          next(null, resp._doc);
      })
      .catch((err) => {
          next(err);
      })
};

const updateReview = function(reviewInfo, next) {
    db.update(reviewInfo)
        .then((result) => {
            next(null, result._doc);
        })
        .catch((err) => {
            console.log(`DB failed upate: \n ${err}`)
            next(err);
        })
};

const remove = function(reviewId, next) {
    db.remove(reviewId)
    .then((result) => {
        next(null, result._doc);
    })
    .catch((err) => {
        console.log(`DB failed remove: \n ${err}`)
        next(err);
    })
};

module.exports = {
    addReview:   function(review) {
        return new Promise((resolve, reject) => {
            addReview(review, (err, resp)  => {
                if (err) {
                    reject(err);
                }
                resolve(resp);
            })
        })
    },
    updateReview: function(review) {
        return new Promise((resolve, reject) => {
            updateReview(review, (err, resp)  => {
                if (err) {
                    reject(err);
                }
                resolve(resp);
            })
        })
    }, 
    remove: function(reviewId) {
        return new Promise((resolve, reject) => {
            remove(reviewId, (err, resp)  => {
                if (err) reject(err);
                resolve(resp);
            })
        });
    }
}

