var Compiler = require('monkberry').Compiler;
var loaderUtils = require('loader-utils');

module.exports = function (content) {
  this.cacheable();

  var compiler = new Compiler();

  var request = loaderUtils.getCurrentRequest(this);

  compiler.addSource(request, content);

  var output = compiler.compile(true).toStringWithSourceMap();
  output.map.setSourceContent(request, content);

  this.callback(null, output.code, output.map.toJSON());
};
