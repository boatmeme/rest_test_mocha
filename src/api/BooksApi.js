var Book = require('../middleware/BookController');

module.exports = function(app) {
  var endpoint = '/books';

  app.all(endpoint + '*', function(req,res){
    res.sendStatus(404);
  });

}
