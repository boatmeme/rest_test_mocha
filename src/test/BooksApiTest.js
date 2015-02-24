var request = require('supertest');
var should = require('should');
var api = require('../app.js').app;
var _ = require('lodash');

var method = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'del'
}

var post = function(uri,status,payload,auth) {
  return validateStatusCode(uri,method.POST,status,payload,auth);
}
var get = function(uri,status,auth) {
  return validateStatusCode(uri,method.GET,status,undefined,auth);
}
var put = function(uri,status,payload,auth) {
  return validateStatusCode(uri,method.PUT,status,payload,auth);
}
var del = function(uri,status,auth) {
  return validateStatusCode(uri,method.DELETE,status,undefined,auth);
}

var validateStatusCode = function(uri,method,status,payload,auth) {
  return function(done) {
    var r = request(api)[method](uri);
    if(payload)
      r = r.send(payload)
    if(status)
      r = r.expect(status)
    if(auth)
      r = r.set('Authorization',auth)
    return r.end(done);
  }
}

var validateBookResponse = function(apiCall) {
  return function(done) {
    return apiCall(function(err, res) {
      if(err) throw err;
      validateBook(res.body);
      done();
    })
  }
}

var validateBookArrayResponse = function(apiCall,length) {
  return function(done) {
    return apiCall(function(err, res) {
      if(err) throw err;
      res.body.should.be.an.Array.of.length(length);
      res.body.forEach(function(book){
        validateBook(book);
      })
      done();
    })
  }
}

var validateBook = function(book) {
  book.should.be.ok;
  book.should.have.property('title');
  book.should.have.property('author');
  book.should.have.property('created_at');
  book.should.have.property('updated_at');
}

describe('API',function(){
    before(function(done){
      // Define setup for all tests
      // ... create users, create agents associated with users, etc.
      done();
    })

    describe(url = '/books',function(){
      var book = {
          title: 'Cosmos: A Personal Voyage',
          author: 'Carl Sagan'
        }
      var invalid_book = {
          author: 'Charles Babbage'
        }
      describe('POST',function(){
        it('should persist a new book as Authorized User', validateBookResponse(post(url,201,book,'ADMIN')));
        it('should return a 400 Bad request for invalid payload', post(url,400,invalid_book,'ADMIN'));
      });
      describe('PUT',function(){
        it('should return a 501 Unimplemented', put(url,501));
      });
      describe('GET',function(){
        it('should return a list of all books', validateBookArrayResponse(get(url,200), 1));
      });
      describe('DELETE',function(){
        it('should delete all books', del(url,204,'ADMIN'));
      });
    });

    describe(url = '/books/:id',function(){
        describe('POST',function(){
          it('should return a 501 Unimplemented', post(url,501));
        });
        describe('PUT',function(){
          var book =  {
            title: 'Cosmos: A Personal Voyage',
            author: 'Carl Sagan'
          }
          var updated_book;
          before(function(done){
            post(url,204,book)(function(err,res){
              updated_book = res.body;
              updated_book.title = 'Something Different'
              done();
            })
          });
          it('should update an existing book', put(url,204,book,'ADMIN'));
          it('should return a 400 Bad request for invalid payload');
          it('should return a 404 Not Found for non-existent book');
        });
        describe('GET',function(){
          it('should return a 404 Not Found for non-existent book');
        });
        describe('DELETE',function(){
          it('should delete a book')
          it('should return a 404 Not Found for non-existent book');
        });
      });
});
