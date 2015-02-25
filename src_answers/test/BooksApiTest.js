var request = require('supertest');
var should = require('should');
var api = require('../app.js').app;

describe('Books API',function(){
  var url = '/books';
  var book = {
      title: "Cosmos: A Personal Voyage",
      author: "Carl Sagan"
    }
  describe('/books',function(){
    describe('POST',function(){
      it('should create a new book', function(done) {
        request(api)
          .post(url)
          .send(book)
          .expect(201)
          .end(function(err,res){
            if(err) throw err;
            res.body.should.be.an.Object;
            res.body.should.have.property('title');
            res.body.should.have.property('author');
            res.body.should.have.property('id');
            done();
          });
      });
    });
    describe('GET',function(){
      it('should get a list of all books', function(done) {
        request(api)
          .get(url)
          .send(book)
          .expect(200)
          .end(function(err,res){
            if(err) throw err;
            res.body.should.be.an.Array.of.length(1);
            res.body.forEach(function(b){
              b.should.have.property('title');
              b.should.have.property('author');
              b.should.have.property('id');
            });
            done();
          });
      });
    });
    describe('PUT',function(){
      it('should return 501 Not Implemented', function(done) {
        request(api)
          .put(url)
          .send(book)
          .expect(501)
          .end(done);
      });
    });
    describe('DELETE',function(){
      it('should return 501 Not Implemented',  function(done) {
        request(api)
          .del(url)
          .expect(501)
          .end(done);
      });
    });
  });
  describe('/books/:id',function(){
    var book_url;
    // Setup test by creating a new book
    before(function(done){
      request(api)
        .post(url)
        .send(book)
        .expect(201)
        .end(function(err,res){
          if(err) throw err;
          book = res.body;
          book_url = url + '/' + book.id
          done();
        });
    })
    describe('POST',function(){
      it('should return 501 Not Implemented', function(done) {
        request(api)
          .post(book_url)
          .send(book)
          .expect(501)
          .end(done);
      });
    });
    describe('GET',function(){
      it('should get the details of an existing book', function(done) {
        request(api)
          .get(book_url)
          .expect(200)
          .end(function(err,res){
            if(err) throw err;
            res.body.should.be.an.Object;
            res.body.should.have.property('title');
            res.body.should.have.property('author');
            res.body.should.have.property('id');
            res.body.should.be.eql(book);
            done();
          });
      });
      it('should return 404 Not Found for non-existent book', function(done) {
        request(api)
          .get(book_url + 'nonce')
          .expect(404)
          .end(done);
      });
    });
    describe('PUT',function(){
      // You'd probably want to implement a before() block in here to create a new book,
      // modify it in the test below, and then do another GET afterward to confirm it was actually updated.
      it('should update an existing book', function(done) {
        book.title = 'something_different';
        request(api)
          .put(book_url)
          .send(book)
          .expect(204)
          .end(done);
      });
      it('should return 404 Not Found for non-existent book', function(done) {
        request(api)
          .put(book_url + 'nonce')
          .send(book)
          .expect(404)
          .end(done);
      });
    });
    describe('DELETE',function(){
      // You'd probably want to implement a before() block in here to create a new book,
      // delete it in the test below, and then do another GET afterward to confirm it was actually deleted (returns 404).
      it('should delete an existing book', function(done) {
        book.title = 'something_different';
        request(api)
          .del(book_url)
          .expect(204)
          .end(done);
      });
      it('should return 404 Not Found for non-existent book', function(done) {
          request(api)
            .del(book_url + 'nonce')
            .expect(404)
            .end(done);
        });
    });
  });
});
