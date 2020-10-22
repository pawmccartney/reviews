const express = require('express');
let app = express();
const db = require('../database/index.js');
const controllor = require('./controllor.js');
const benchTools = require('../spec/benchmarking.js');
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/hotel/:hotel', (req, res) => {
  benchTools.markGetStart();
  let hotel = req.params.hotel === 'root'? 'hotel0': req.params.hotel;
  let id = hotel.slice(5);
  controllor.getReviews(id)
    .then(result => {
      benchTools.markGetEnd();
      benchTools.measureGetTime('Validate GET request speeds', 'Starting GET test','Finished GET request' )
      res.send(result);
    });
});

app.get('/:id', (req, res) => {
  const fileName = 'index.html';
  const options = {
    root: __dirname + '/../client/dist'
  }
  res.sendFile(fileName, options);
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
    .then((updatedReview) => {
      res.send(updatedReview)
    })
    .catch((err) => {
      console.log(`err updateing: \n ${err}`);
      res.status(204).header({error: err}).end();
    });
})

app.delete('/', (req, res) => {
  let { body } = req;
  controllor.remove(body.reviewId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log('Error deleteing: \n',  err);
      res.status(204).header({error: err}).end();
    });
});
module.exports = app;
