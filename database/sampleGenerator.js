const mongoose = require('mongoose');
const db = require('./index.js');
const faker = require('faker');

var hotels = [];

for (var i = 0; i < 1; i++) {
  var currHotelReview = {};

  let randomDate = faker.date.month();
  let travelTypes = ['Families','Couples', 'Solo', 'Business', 'Friends'];
  //hotel info
  currHotelReview.responderInfo.hotelId = i;
  currHotelReview.responderInfo.responderOrgm = faker.company.companyName();
  currHotelReview.responderInfo.responderName = faker.name.findName();
  currHotelReview.responderInfo.responderPosition = faker.name.jobTitle();
  currHotelReview.responderInfo.responderPicture = 'https://st.depositphotos.com/1009420/1287/i/450/depositphotos_12879459-stock-photo-welsh-corgi-pembroke-dog.jpg';
  currHotelReview.responderInfo.responderDate = randomDate;
  currHotelReview.responderInfo.responderText = faker.lorem.text();
  currHotelReview.responderInfo.responderClose = faker.company.bsAdjective();

  var randomReviewNumber = Math.ceil(Math.random() * 1);
  for (var j = 0; j <randomReviewNumber; j++) {
    //member info
    currHotelReview.memberInfo.memberId = j;
    currHotelReview.memberInfo.memberImg = 'https://cdn.pixabay.com/photo/2015/07/08/01/21/korean-jindo-835297_1280.jpg';
    currHotelReview.memberInfo.memberUserName = faker.company.userName();
    currHotelReview.memberInfo.contribution: Math.ceil(Math.random() * 100);
    currHotelReview.memberInfo.helpful: Math.floor(Math.random() * 6);

    //review info
    currHotelReview.reviewInfo.reviewDate: randomDate;
    currHotelReview.reviewInfo.reviewTitle: faker.commerce.productAdjective;
    currHotelReview.reviewInfo.reviewText: faker.lorem.text();
    currHotelReview.reviewInfo.reviewTripType: travelTypes[Math.floor(Math.random() * 5)];
    currHotelReview.reviewInfo.reviewPictures: {picture1: 'https://media.istockphoto.com/photos/lot-of-colourful-many-macaroons-variety-closeup-for-background-picture-id859640038?k=6&m=859640038&s=612x612&w=0&h=XQLV0NuQCieC0W67DIQasqwkgQZVtZjTxV8QpfeUKZY=', picture2: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/jenn-feldman-img07-1587155877.jpg'};
    currHotelReview.reviewInfo.reviewRatings: Math.ceil(Math.random() * 5);

    //add it to hotels
    hotels.push(db.save(currHotelReview));
  }
}

Promise.all(hotels)
  .then(result => {
    mongoose.connection.close();
  });