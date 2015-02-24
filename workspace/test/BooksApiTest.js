var request = require('supertest');
var should = require('should');
var server = require('../app.js');
var _ = require('lodash');
var api = server.app;

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
  describe(url = '/',function(){

    describe('POST',function(){
      it('should return a 501 Unimplemented', post(url,501));
    });
    describe('PUT',function(){
      it('should return a 501 Unimplemented', put(url,501));
    });
    describe('GET',function(){
      it('should return a 501 Unimplemented', get(url,501));
    });
    describe('DELETE',function(){
      it('should return a 501 Unimplemented', del(url,501));
    });
    describe(url = url + 'books',function(){
      describe('POST',function(){
        var book = {
          title: 'Cosmos: A Personal Voyage',
          author: 'Carl Sagan'
        }
        var invalid_book = {
          author: 'Charles Babbage'
        }
        it('should persist a new book as Authorized User', validateBookResponse(post(url,201,book,'ADMIN')));
        it('should return a 400 Bad request for invalid payload', post(url,400,invalid_book,'ADMIN'));
        it('should return a 401 Unauthorized for anonymous user', post(url,401,book));
        it('should return a 403 Forbidden for Authenticated User without write permissions', post(url,403,book,'USER'));
      });
      describe('PUT',function(){
        it('should return a 501 Unimplemented', put(url,501));
      });
      describe('GET',function(){
        it('should return a list of all books', validateBookArrayResponse(get(url,200), 1));
      });
      describe('DELETE',function(){
        it('should delete all books as an authorized user', del(url,204,'ADMIN'));
        it('should return a 401 Unauthorized for anonymous user', del(url,401));
        it('should return a 403 Forbidden for Authenticated User without write permissions', del(url,403,'USER'));
      });
      describe(url = url + '/MyBook',function(){
        describe('POST',function(){
          it('should return a 501 Unimplement ', post(url,501));
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
          it('should update an existing book as Authorized User', put(url,204,book,'ADMIN'));
          it('should return a 400 Bad request for invalid payload');
          it('should return a 404 Not Found for non-existent book');
          it('should return a 401 Unauthorized for anonymous user');
          it('should return a 403 Forbidden for Authenticated User without write permissions');
        });
        describe('GET',function(){
          it('should return a specific book as anonymous user');
          it('should return a 404 Not Found for non-existent book');
        });
        describe('DELETE',function(){
          it('should delete a book as an Authorized User')
          it('should return a 401 Unauthorized for anonymous user');
          it('should return a 403 Forbidden for Authenticated User without write permissions');
          it('should return a 404 Not Found for non-existent book');
        });
      });
    });
  });
});
