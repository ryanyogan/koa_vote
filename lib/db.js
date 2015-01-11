var monk = require('monk');
var wrap = require('co-monk');
var db   = require('localhost/koaVote');

var questions = wrap(db.get('questions'));
module.exports.questions = questions;
