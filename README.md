# Reviews

Interactive Review Section for a TripAdCoba listing.

Disaplys general layout of reviews, and options for reviews.


## Getting Started:
1. npm install
2. npm seedDB
3. npm build
4. npm start

Reading from src/component/app.jsx is confusing, but will give an overview of the entire module

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