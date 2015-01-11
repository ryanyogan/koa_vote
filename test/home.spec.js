var app     = require('../app');
var request = require('supertest').agent(app.listen());
var db      = require('./../lib/db.js');
var co      = require('co');
var should  = require('should');
var cleaner = require('./testHelpers');

describe("The homepage", function() {
  beforeEach(function(done) {
    cleaner.removeAllDocs();
    done();
  });

  afterEach(function(done) {
    cleaner.removeAllDocs();
    done();
  });

  it("displays with no errors", function(done) {
    request
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(done);
  });

  it("lists all the questions in the database", function(done) {
    co(function *() {
      yield db.questions.insert({title: "Question Q1"});
      yield db.questions.insert({title: "Question Q2"});

      request
        .get('/')
        .expect(200)
        .expect(function(res) {
          res.text.should.containEql("Question Q1");
          res.text.should.containEql("Question Q2");
        })
        .end(done);
    });
  });
});
