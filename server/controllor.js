const db = require('../database/index');
const postgres  = require('../database/connections/postgres.index');

const getReviews = (hotelId, next) => {

    let completeUrl = (endpoint) => `https://hr48sdcreviews.s3-us-east-2.amazonaws.com/sdcImages${endpoint}`;
    let formatReviews = (rows) => {
        return  rows.reduce((list, review) => {
            list.push({
                reviewInfo: {
                    reviewDate: review.date,
                    reviewTitle: review.title,
                    reviewText: review.text,
                    reviewTripType: review.tripType,
                    reviewPictures: {picture1: completeUrl(review.image1), picture2: completeUrl(review.image2), picture3: completeUrl(review.image3), picture4: completeUrl(review.image4)},
                    reviewRatings: [review.member]
                }, 
                memberInfo: {
                    memberId: review.id,
                    memberImg: review.avatar,
                    memberUser: review.username,
                    memberLocation: review.location,
                    memberContributions: Number(review.contributions),
                    memberHelpful: Number(review.helpful)
                },
                responderInfo: {
                    hotelid: review.hotelId,
                    responderOrg: review.orginization,
                    responderPicture: review.avatar,
                    responderClose: review.close,
                    responderDate: review.date,
                    responderName: review.username,
                    responderPosition: review.position,
                    responderText: review.text
                }
            });
            return list;
        }, []);
    };
    postgres.query(`SELECT * FROM posts INNER JOIN members ON posts.member =  members.id WHERE posts.hotelid = ${hotelId + 1} ; `, (err, results) => {
        if (err) next(err);
        let responseData = formatReviews(results.rows);
        next(null, responseData);
    })
};

const addReview = function(data, next) {
    let query = data ? `INSERT INTO posts(hotelid, member, title, text, triptype, image1, image2, image3, image4, date)VALUES(${data.hotelid},${data.member},'${data.title}','${data.text}','${data.triptype}','${data.image1}','${data.image2}','${data.image3}','${data.image4}','${data.date}')` : next('no data to enter');
    postgres.query(query, (err, resp) => {
        if (err) next(err);
        next(null, 'Row entered');
    })
};

const updateReview = function(reviewInfo, next) {
    let reviewId = reviewInfo.reviewId;
    let query = `UPDATE posts SET text = '${reviewInfo.newText}' WHERE id = ${reviewId}`;
    postgres.query(query, (err, resp) => {
        if (err) next(err);
        next(null, 'Review updated');
    })
};

const remove = function(reviewId, next) {
    let query = `DELETE FROM posts WHERE id = ${reviewId}`;
    postgres.query(query, (err, resp) => {
        if (err) next(err);
        next(null, 'Review deleted');
    })
};

module.exports = {
    getReviews: (hoteIid) => {
        return new Promise((resolve, reject) => {
            getReviews(hoteIid, (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    },
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
