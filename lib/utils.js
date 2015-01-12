module.exports.splitTags = function (tagString) {
  var tags = tagString.split(',');

  tags.map(function(tag) {
    return tag.trim();
  });

  return tags;
}
