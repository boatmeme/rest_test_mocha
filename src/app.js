var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Parse Request Body as JSON
app.use(bodyParser.json());

// Load all API Routes
require('./api')(app);

// Generic Error Handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json(err);
});

// Start the server, bind the process to a live port
function start(port) {
  var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('Books API listening at http://%s:%s', host, port)
  });
  return server;
}

module.exports = {
  app: app,
  start: start
}
