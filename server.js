// server.js
// where your node app starts

// init project
const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
var schedule = require('node-schedule');
const wishController = require('./src/router/wishController');
const crone = require('./src/crone/mailerCrone');
require('dotenv').config()

app.use('/wish/', wishController)
app.use(bodyParser());
app.use(morgan());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});


// Crone Job for sending valid age requests on mail after every 15 seconds. 
var j = schedule.scheduleJob('*/15 * * * * *', function() {
  crone.sentValidRequestMail();
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
