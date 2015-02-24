var Auth = require('../middleware/Auth')
var Book = require('../middleware/Book');

module.exports = function(app) {
  var endpoint = '/books';

  app.post(endpoint, Auth.is('ADMIN'), Book.validate, Book.save);
  app.get(endpoint, Book.findAll);
  app.delete(endpoint, Auth.is('ADMIN'), Book.deleteAll);

  app.all('*', function(req,res){
    res.sendStatus(501);
  });
}
