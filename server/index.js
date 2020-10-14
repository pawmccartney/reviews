const app = require('./app');
const port = 4003;

app.listen(port, function() {
    console.log(`listening on port: ${port}`);
});
