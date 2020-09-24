const express = require('express');
let app = express();
const port = 4003;

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.listen(port, function() {
  console.log(`listening on port: ${port}`);
});