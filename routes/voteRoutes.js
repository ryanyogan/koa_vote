var render = require('./../lib/render');
var db     = require('./../lib/db');
var utils  = require('./../lib/utils');
_          = require('lodash');

module.exports.showAddVote = function *() {
  var questionId = this.query.questionId;

  if (_.isEmpty(this.query.questionId)) {
    this.set('ErrorMessage', 'No questionId passed to page');
    this.redirect('/');
    return;
  }

  var question = yield db.questions.findById(questionId);

  if (_.isEmpty(question)) {
    this.set('ErrorMessage', 'No question found.');
    this.redirect('/');
    return;
  }

  var vm = {
    tagString: question.tags.join(','),
    questionTitle: question.title,
    questionId: questionId
  };

  this.body = yield render('newVote', vm);
};

module.exports.addVote = function *() {
  var postedData = yield parse(this);

  if (_.isEmpty(postedData.questionId)) {
    this.set('ErrorMessage', 'QuestionId required');
    this.redirect('/');
    return;
  }

  var vote = {
    tags: utils.splitTags(postedData.tagString),
    createdAt: new Date,
    questionId: postedData.questionId,
    value: postedData.voteValue
  };

  var v = yield db.votes.insert(vote);
  this.redirect('/vote/' + v._id + '/comment');
}
