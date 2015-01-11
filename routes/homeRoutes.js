var render = require('../lib/render');
var db     = require('./../lib/db');

module.exports.showHome = function *() {
  var questionsList = yield db.questions.find({});

  this.body = yield render("home", { questions : questionsList });
};
