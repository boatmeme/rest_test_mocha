var db = require('../db/BookDb');

function validate(req,res,next) {
  var book = req.body;
  if(book && book.title && book.author) {
    next();
  } else {
    var err = new Error('Book Payload Failed Validation');
    err.status = 400;
    next(err);
  }
}

function create(req,res,next) {
  var book = req.body;
  var result = db.save(book);
  res.status(201).json(result);
}

function update(req,res,next) {
  var book = req.body;
  book.id = req.params.id;
  if(!db.get(req.params.id)) {
    var err = new Error('Book Not Found');
    err.status = 404;
    next(err)
  } else {
    var result = db.save(book);
    res.sendStatus(204);
  }
}

function get(req,res,next) {
  var book = db.get(req.params.id);
  if(!book) {
    var err = new Error('Book Not Found');
    err.status = 404;
    next(err)
  } else {
    res.json(book);
  }
}

function deleteBook(req,res,next) {
  var id = req.params.id;
  if(!db.delete(id)) {
    var err = new Error('Book Not Found');
    err.status = 404;
    next(err)
  } else {
    res.sendStatus(204);
  }
}

function findAll(req,res,next) {
  res.json(db.findAll());
}

function deleteAll(req,res,next) {
  db.drop();
  res.sendStatus(204);
}


module.exports = {
  validate: validate,
  create: create,
  update: update,
  delete: deleteBook,
  get: get,
  findAll: findAll,
  deleteAll: deleteAll
}
