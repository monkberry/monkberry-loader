var Compiler = require('monkberry').Compiler;
var loaderUtils = require('loader-utils');

module.exports = function (content) {
  this.cacheable();
  var query = loaderUtils.parseQuery(this.query);
  var request = loaderUtils.getCurrentRequest(this);

  var compiler = new Compiler();

  if (query.globals) {
    compiler.globals = query.globals;
  }

  try {
    var node = compiler.compile(request, content);
  } catch (error) {
    this.emitError(error.toString());
    return '';
  }
  
  var output = node.toStringWithSourceMap();
  output.map.setSourceContent(request, content);

  this.callback(null, output.code, output.map.toJSON());
};
