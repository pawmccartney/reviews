# Reviews

Interactive Review Section for a TripAdCoba listing.

Disaplys general layout of reviews, and options for reviews.


## Getting Started:
1. npm install
2. npm seedDB
3. npm build
4. npm start

Reading from src/component/app.jsx is confusing, but will give an overview of the entire module

## RESTFUL API
This API accepts GET(retrieve a list), POST(add one), PUT(update one), and DELETE(remove one) requests for new reviews and existing reviews.

**ALL DOCUMENT STRUCTURES**
```
_DOCUMENTOBJ = {
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
}
```
**GET LIST OF HOTEL REVIEWS:**
  - Method: GET
  - URL: '/hotel/:hotelId'
```
Response
Status: 200
body: [_DOCUMENTOBJ, _DOCUMENTOBJ...]
Connection: close
Content-Type: application/json
```

**POST A REVIEW:**
  - Method: POST
  - URL: '/'
```
REQUIRED HEADERS
DATA: _DOCUMENTOBJ

Response
Status: 201 Created
Connection: close
Content-Type: application/json
body: [_DOCUMENTOBJ]
```

**UPDATE A REVIEW:**
  - Method: PUT
  - URL: '/'
```
REQUIRED HEADERS
body: {
  reviewId: number(id for review to be. updated),
  newText: string(string to be iniserted as replacement)
}

Response
Status: 201
Connection: close
Content-Type: application/json
body: [_DOCUMENTOBJ]
```

**DELETE A REVIEW:** 
 - Method: DELETE
 - URL: '/'
```
Response
Status: 204
Connection: close
Content-Type: application/json
```
    
## Database
All the review datas are generated from database/sampleGenerator.js.
Read alongside database.index.js to best understand schema.

Using Database:
1. mongo
2. use review

-Read Data:
1. db.reviews.find({}).pretty();

-Reseed
1. db.reviews.dropDatabase();
2. ctrl + C (quit mongo);
3. npm seedDB


## Server
server/index.js handles all requests.
Read src/component/app.jsx componentDidMount function to best undestand its structures.


## Filtering
Filtering functions has many overlaps, and will be possible to refactor to simplify its complexity.
Becareful of variable name changes.
