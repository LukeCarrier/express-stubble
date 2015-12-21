var fs = require('fs');
var merge = require('merge');

var DEFAULTS = {
  handlebars: undefined,
  encoding: 'utf8'
};

function ExpressStubble(options) {
  options = merge(DEFAULTS, options);
  this.engine = this.render.bind(this);

  this.handlebars = options.handlebars;
  delete options.handlebars;

  this.options = options;
}

ExpressStubble.prototype.withTemplate = function(filePath, callback) {
  fs.readFile(filePath, this.options.encoding, function(err, content) {
    if (err) {
      throw new Error(err);
    }

    callback(this.handlebars.compile(content));
  }.bind(this));
};

ExpressStubble.prototype.render = function(filePath, options, callback) {
  this.withTemplate.apply(this, [filePath, function(template) {
    var rendered = template(options);
    callback(null, rendered);
  }]);
};

module.exports = function(options) {
  var instance = new ExpressStubble(options);

  return instance.render.bind(instance);
};
