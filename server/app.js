const express = require('express');
let app = express();
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
      benchTools.markPOSTEnd();
      benchTools.measurePOSTTime();
      res.send(msg);
    })
    .catch((err) => {
      benchTools.markPOSTEnd();
      benchTools.measurePOSTTime();
      res.status(204).header({error: err}).end();
      console.log(`Need to log new error \n\n ${err}`);  
    })
});
  
app.put('/', (req, res) => {
  let { body } = req;
  benchTools.markPUTStart();
  controllor.updateReview({reviewId: body.reviewId, newText: body.newText})
    .then((updatedReview) => {
      benchTools.markPUTEnd();
      benchTools.measurePUTTime();
      res.send(updatedReview)
    })
    .catch((err) => {
      console.log(`err updateing: \n ${err}`);
      res.status(204).header({error: err}).end();
    });
})

app.delete('/', (req, res) => {
  let { body } = req;
  benchTools.markDELETEStart();
  controllor.remove(body.reviewId)
    .then((result) => {
      benchTools.markDELETEEnd();
      benchTools.measureDELETETime();
      res.send(result);
    })
    .catch((err) => {
      console.log('Error deleteing: \n',  err);
      res.status(204).header({error: err}).end();
    });
});
module.exports = app;
