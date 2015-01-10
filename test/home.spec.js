var app     = require('../app');
var request = require('supertest').agent(app.listen());

describe("The homepage", function() {
  it("displays with no errors", function(done) {
    request
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(done);
  });
});
