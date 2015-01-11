var app = require('./../app');
var request = require('supertest').agent(app.listen());
var cleaner = require('./testHelpers');

describe("Adding questions", function () {
  beforeEach(function(done) {
    cleaner.removeAllDocs();
    done();
  });

  afterEach(function(done) {
    cleaner.removeAllDocs();
    done();
  });

  var aQuestionForm = {
    questionTitle: "A question",
    tagString: "tag1, tag2, tag3"
  };

  it("has a page to add questions", function (done) {
    request
      .get('/question')
      .expect(200)
      .expect("Content-Type", /html/)
      .end(done)
  });

  it("stores correct formatted forms as new questions", function (done) {
    request
      .post('/question')
      .send(aQuestionForm)
      .expect(302)
      .expect("location", /^\/question\/[0-9a-fA-F]{24}$/)
      .end(done);
  });
});
