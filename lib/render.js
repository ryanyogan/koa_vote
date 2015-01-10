var view = require('co-views');

module.exports = view(__dirname + './../views', {
  map: { html: 'swig' }
});
