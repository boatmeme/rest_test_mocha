var Book = require('../middleware/BookController');

module.exports = function(app) {
  var endpoint = '/books';

  app.post(endpoint, Book.create);
  app.get(endpoint, Book.findAll);

  app.get(endpoint + '/:id', Book.get);
  app.put(endpoint + '/:id', Book.update);
  app.delete(endpoint + '/:id', Book.delete);

  app.all(endpoint + '*', function(req,res){
    res.sendStatus(501);
  });

}
