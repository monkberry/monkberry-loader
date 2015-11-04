var Compiler = require('monkberry').Compiler;
var loaderUtils = require('loader-utils');

module.exports = function (content) {
  this.cacheable();

  var compiler = new Compiler();
  var filename = loaderUtils.interpolateName(this, '[name].[ext]', {content: content});
  var name = loaderUtils.interpolateName(this, '[name]', {content: content});

  compiler.addSource(name, content);

  var output = compiler.compile(true).toStringWithSourceMap({
    file: filename
  });

  this.callback(null, output.code.toString(), output.map.toString());
};
