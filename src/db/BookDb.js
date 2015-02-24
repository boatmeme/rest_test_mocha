var Guid = require('guid');
var _ = require('lodash');
var db = {};


module.exports = {
  save: function(book) {
    book.updated_at = Date.now();
    if(!book.id) {
      book.id = Guid.create();
      book.created_at = book.updated_at;
    }
    db[book.id] = book;
    return book;
  },
  get: function(id) {
    return db[id];
  },
  delete: function(id) {
    if(!db[id]) {
      return 0;
    } else {
      delete db[id];
      return 1;
    }
  },
  findAll: function() {
    return _.values(db);
  },
  drop: function() {
    db = {};
  }
}
