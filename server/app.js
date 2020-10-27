require('newrelic');
const express = require('express');
let app = express();
const controllor = require('./controllor.js');
const benchTools = require('../spec/benchmarking.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/hotel/:hotel', (req, res) => {
  let hotelId = req.params.hotel === 'root'? '0': req.params.hotel;
  controllor.getReviews(hotelId)
  .then(result => {
    console.log('sent hotels')
      res.send(result);
    })
    .catch((err) => {
      res.status(500);
      res.send({error: err});
    });
});

app.get('/:id', (req, res) => {
  const options = {
    root: __dirname + '/../client/dist'
  }
  res.sendFile('index.html', options);
});

app.post('/', (req,  res) => {
  let { body } = req;
  benchTools.markPOSTStart();
  controllor.addReview(body.review)
    .then((msg) => {
      res.send(msg);
    })
    .catch((err) => {
      console.log('error posting')
      res.status(500);
      res.send({error: err})
    })
});
  
app.put('/', (req, res) => {
  let { body } = req
  controllor.updateReview({reviewId: body.reviewId, newText: body.newText})
    .then((updatedReview) => {
      res.send(updatedReview)
    })
    .catch((err) => {
      console.log(`err updateing: \n ${err}`);
      res.status(500);
      res.send({error: err});
    });
})

app.delete('/:id', (req, res) => {
  controllor.remove(req.params.reviewId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log('Error deleteing');
      res.status(500);
      res.send({error: err});
    });
});

module.exports = app;
