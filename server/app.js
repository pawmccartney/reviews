const express = require('express');
let app = express();
const db = require('../database/index.js');
const controllor = require('./controllor');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get('/hotel/:hotel', (req, res) => {
  console.log('in');
  console.log('hotel', req.params.hotel);
  let hotel = req.params.hotel === 'root'? 'hotel0': req.params.hotel;
  let id = hotel.slice(5);
  db.getReviewsByHotel(id)
    .then(result => {
      res.send(result);
    });
});

app.get('/:id', (req, res) => {
  const fileName = 'index.html';
  const options = {
    root: __dirname + '/../client/dist'
  }
  res.sendFile(fileName, options, function(err){
    if(err) {
      console.log('error', err);
    } else {
      console.log('file sent', fileName);
    }
  });
});

app.post('/', (req,  res) => {
  let { body } = req;
  controllor.addReview(body.review)
    .then((newReview) => {
      res.send(newReview);
    })
    .catch((err) => {
      console.log(`Need to log new error \n\n ${err}`)
      res.status(204).header({error: err}).end();
    })
  });
  
app.put('/:reviewId', (req, res) => {
  let { body } = req;
  controllor.updateReview({reviewId: body.reviewId, newText: body.newText})
    .then((uopdatedReview) => {
      res.send(uopdatedReview)
    })
    .catch((err) => {
      console.log(`err updateing: \n ${err}`);
      res.status(204).header({error: err}).end();
    });
})

module.exports = app;
