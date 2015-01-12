var app = require('./../app');
var request = require('supertest').agent(app.listen());
var db      = require('./../lib/db.js');
var co      = require('co');
var should  = require('should');
var cleaner = require('./testHelpers');

describe("Voting on a question", function() {
  beforeEach(function(done) {
    cleaner.removeAllDocs();
    done();
  });

  afterEach(function(done) {
    cleaner.removeAllDocs();
    done();
  });

  var test_question = { title: "To be?", tags: ["tag1", "tag2"] };
  var test_vote_form = {
    tagString: "tag1, tag2, tag3",
    questionId: 000000000000000000000000,
    voteValue: 4
  };

  it("has a page for voting from", function(done) {
    co(function *() {
      var q = yield db.questions.insert(test_question);

      request
        .get('/vote?questionId=' + q._id)
        .expect('Content-Type', /html/)
        .expect(function(res) {
          res.text.should.containEql(q.title);
        })
        .expect(200, done);
    });
  });

  it('can add a vote and redirect to the comment page', function(done) {
    request
      .post('/vote')
      .send(test_vote_form)
      .expect('location', /^\/vote\/[0-9a-fA-F]{24}\/comment$/)
      .expect(302, done);
  });

  it('requires a question reference', function(done) {
    delete test_vote_form.questionId;

    request
      .post('/vote')
      .send(test_vote_form)
      .expect('location','/')
      .expect('ErrorMessage', 'QuestionId required')
      .expect(302, done);
  });

  it("reutrns error when no question can be found", function(done) {
    request
      .get('/vote?questionId=000000000000000000000000')
      .expect(302)
      .expect('location', '/')
      .expect('ErrorMessage', 'No question found.')
      .end(done);
  });

  it('returns an error when no questionId is passed on the page', function(done) {
    request
      .get('/vote')
      .expect(302)
      .expect('location', '/')
      .expect('ErrorMessage', 'No questionId passed to page')
      .end(done);
  });
});
