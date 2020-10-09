const mongoose = require('mongoose');
const db = require('./index.js');
const faker = require('faker');

var hotels = [];

for (var i = 0; i < 100; i++) {
  var currHotelReview = {
    responderInfo: {},
    memberInfo: {},
    reviewInfo: {}
  };

  let travelTypes = ['Families','Couples', 'Solo', 'Business', 'Friends'];
  let close = faker.company.bsAdjective();
  //hotel info
  currHotelReview.responderInfo.hotelId = i;
  currHotelReview.responderInfo.responderOrg = faker.company.companyName();
  currHotelReview.responderInfo.responderPicture = `https://adcobareviews.s3-us-west-1.amazonaws.com/a30.jpg`;
  currHotelReview.responderInfo.responderClose = close.charAt(0).toUpperCase() + close.slice(1);

  var randomReviewNumber = Math.ceil(Math.random() * 5);
  //change back
  for (var j = 0; j < 5; j++) {
    const randomDate = faker.date.recent(360);
    currHotelReview.responderInfo.responderDate = randomDate;
    currHotelReview.responderInfo.responderName = faker.name.findName();
    currHotelReview.responderInfo.responderPosition = faker.name.jobTitle();
    currHotelReview.responderInfo.responderText = faker.lorem.paragraph(3, '\n');
    //member info
    currHotelReview.memberInfo.memberId = j;
    currHotelReview.memberInfo.memberImg = `https://adcobareviews.s3-us-west-1.amazonaws.com/a${Math.ceil((Math.random() * 9) + 20)}.jpg`;
    currHotelReview.memberInfo.memberUserName = faker.internet.userName();
    currHotelReview.memberInfo.memberLocation = faker.address.city();
    currHotelReview.memberInfo.memberContributions = Math.ceil(Math.random() * 50);
    currHotelReview.memberInfo.memberHelpful = Math.floor(Math.random() * 5);

    //review info
    const tType = travelTypes[Math.floor(Math.random() * 5)];
    currHotelReview.reviewInfo.reviewDate = randomDate;
    currHotelReview.reviewInfo.reviewTitle = faker.commerce.productAdjective();
    currHotelReview.reviewInfo.reviewText = faker.lorem.text();
    currHotelReview.reviewInfo.reviewTripType = tType;
    currHotelReview.reviewInfo.reviewPictures = {
      picture1:`https://adcobareviews.s3-us-west-1.amazonaws.com/a${Math.ceil(Math.random() * 20)}.jpg`,
      picture2:`https://adcobareviews.s3-us-west-1.amazonaws.com/a${Math.ceil(Math.random() * 20)}.jpg`,
      picture3:`https://adcobareviews.s3-us-west-1.amazonaws.com/a${Math.ceil(Math.random() * 20)}.jpg`,
      picture4:`https://adcobareviews.s3-us-west-1.amazonaws.com/a${Math.ceil(Math.random() * 20)}.jpg`
    };
    let ratings = [0, 0, 0, 0, 0];
    let randNum = Math.ceil(Math.random() * 5)
    for (let i = 0; i < randNum; i++) {
      ratings[i] = 1;
    }
    currHotelReview.reviewInfo.reviewRatings = ratings;

    //add it to hotels
    hotels.push(db.save(currHotelReview));
  }
}

Promise.all(hotels)
  .then(result => {
    mongoose.connection.close();
  })
  .catch(err => {
    console.log('ERROR occured')
  });