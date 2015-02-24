var Guid = require('guid');
var  _ = require('lodash');
var db = {}

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

function save(req,res,next) {
  var book = req.body;
  book.id = req.params.id;
  book.updated_at = Date.now();

  if(!book.id) {
    book.id = Guid.create();
    book.created_at = book.updated_at;
  }

  db[book.id] = book;
  res.status(201).json(book);
}

function get(req,res,next) {
  var book = db[req.params.id];
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
  if(!db[id]) {
    var err = new Error('Book Not Found');
    err.status = 404;
    next(err)
  } else {
    delete db[id];
    res.sendStatus(204);
  }
}

function findAll(req,res,next) {
  res.json(_.values(db));
}

function deleteAll(req,res,next) {
  db = {};
  res.sendStatus(204);
}

module.exports = {
  validate: validate,
  save: save,
  delete: deleteBook,
  get: get,
  findAll: findAll,
  deleteAll: deleteAll
}
