var app = require('./../app');
var request = require('supertest').agent(app.listen());

var db = require('./../lib/db');
var co = require('co');
var should = require('should');
var cleaner = require('./testHelpers');

describe("Updating questions", function() {
  beforeEach(function(done) {
    cleaner.removeAllDocs();
    done();
  });

  afterEach(function(done) {
    cleaner.removeAllDocs();
    done();
  });

  it("shows a nice page for existing questions", function(done) {
    co(function *() {
      var q = yield db.questions.insert({
        title: "A question?",
        tags: ["tag1","tag2"]});

      request
        .get("/question/" + q._id)
        .expect("Content-Type", /html/)
        .expect(function(res) {
          res.text.should.containEql(q.title);
          res.text.should.containEql("tag1, tag2");
        })
        .expect(200, done);
    });
  });

  it("updates an existing question", function(done) {
    co(function *() {
      var q = yield db.questions.insert({
        title: "A monkey is what?",
        tags: ["cool","silly"]});

      request
        .post('/question/' + q._id)
        .send({
          questionTitle: "A gorilla is what?",
          tagString: "awesome, crazy"})
        .expect("location", "/question/" + q._id)
        .expect(302, done);
    });
  });
});
