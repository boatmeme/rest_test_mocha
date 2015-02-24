var Book = require('../middleware/BookController');

module.exports = function(app) {
  var endpoint = '/books';

  app.post(endpoint, Book.validate, Book.create);
  app.get(endpoint, Book.findAll);
  app.delete(endpoint, Book.deleteAll);

  app.put(endpoint + '/:id', Book.validate, Book.update);

  app.all('*', function(req,res){
    res.sendStatus(501);
  });
}
