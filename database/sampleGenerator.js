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
  //hotel info
  currHotelReview.responderInfo.hotelId = i;
  currHotelReview.responderInfo.responderOrg = faker.company.companyName();
  currHotelReview.responderInfo.responderPicture = 'https://st.depositphotos.com/1009420/1287/i/450/depositphotos_12879459-stock-photo-welsh-corgi-pembroke-dog.jpg';
  currHotelReview.responderInfo.responderClose = faker.company.bsAdjective();

  var randomReviewNumber = Math.ceil(Math.random() * 5);
  for (var j = 0; j <randomReviewNumber; j++) {
    const randomDate = faker.date.recent(90);
    currHotelReview.responderInfo.responderDate = randomDate;
    currHotelReview.responderInfo.responderName = faker.name.findName();
    currHotelReview.responderInfo.responderPosition = faker.name.jobTitle();
    currHotelReview.responderInfo.responderText = faker.lorem.text();
    //member info
    currHotelReview.memberInfo.memberId = j;
    currHotelReview.memberInfo.memberImg = 'https://cdn.pixabay.com/photo/2015/07/08/01/21/korean-jindo-835297_1280.jpg';
    currHotelReview.memberInfo.memberUserName = faker.internet.userName();
    currHotelReview.memberInfo.memberContributions = Math.ceil(Math.random() * 50);
    currHotelReview.memberInfo.memberHelpful = Math.floor(Math.random() * 5);

    //review info
    currHotelReview.reviewInfo.reviewDate = randomDate;
    currHotelReview.reviewInfo.reviewTitle = faker.commerce.productAdjective;
    currHotelReview.reviewInfo.reviewText = faker.lorem.text();
    currHotelReview.reviewInfo.reviewTripType = travelTypes[Math.floor(Math.random() * 5)];
    currHotelReview.reviewInfo.reviewPictures = {picture1:`https://adcobareviews.s3-us-west-1.amazonaws.com/${Math.ceil(Math.random() * 20)}.jpg`, picture2: `https://adcobareviews.s3-us-west-1.amazonaws.com/${Math.ceil(Math.random() * 20)}.jpg`, picture3: `https://adcobareviews.s3-us-west-1.amazonaws.com/${Math.ceil(Math.random() * 20)}.jpg`};
    currHotelReview.reviewInfo.reviewRatings = Math.ceil(Math.random() * 5);

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