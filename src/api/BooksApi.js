var Book = require('../middleware/BookController');

module.exports = function(app) {
  var endpoint = '/books';

  // Write your implementation to satisfy the tests here. You may want to look at /middleware/BookController to see the functions
  // that are exported by that module to be used by your express route definitions. Really all you need to hook up are the route definitions, the
  // BookController should handle the implementation of everything else

  app.all(endpoint + '*', function(req,res){
    res.sendStatus(404);
  });

}
