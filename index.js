const fs = require('fs');
const merge = require('merge');

const DEFAULTS = {
  handlebars: undefined,
  encoding: 'utf8',
};

function ExpressStubble(options) {
  const mergedOptions = merge(DEFAULTS, options);
  this.engine = this.render.bind(this);

  this.handlebars = mergedOptions.handlebars;
  delete mergedOptions.handlebars;

  this.options = mergedOptions;
}

ExpressStubble.prototype.withTemplate = function withTemplate(filePath, callback) {
  fs.readFile(filePath, this.options.encoding, function onComplete(err, content) {
    if (err) {
      throw new Error(err);
    }

    callback(this.handlebars.compile(content));
  }.bind(this));
};

ExpressStubble.prototype.render = function render(filePath, options, callback) {
  this.withTemplate.apply(this, [filePath, function renderTemplate(template) {
    const rendered = template(options);
    callback(null, rendered);
  }]);
};

module.exports = function stubble(options) {
  const instance = new ExpressStubble(options);

  return instance.render.bind(instance);
};
