var Compiler = require('monkberry').Compiler;
var loaderUtils = require('loader-utils');

module.exports = function (content) {
  this.cacheable();
  var config = loaderUtils.getLoaderConfig(this, 'monkberry');

  var compiler = new Compiler();

  if (config.globals) {
    compiler.globals = config.globals;
  }

  if (config.transforms) {
    config.transforms.forEach(function (transform) {
      compiler.transforms.push(transform);
    });
  }

  var request = loaderUtils.getCurrentRequest(this);

  try {
    var node = compiler.compile(request, content);
  } catch (error) {
    this.emitError(error.message);
    return '';
  }
  
  var output = node.toStringWithSourceMap();
  output.map.setSourceContent(request, content);

  this.callback(null, output.code, output.map.toJSON());
};
