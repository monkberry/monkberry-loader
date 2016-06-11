var Compiler = require('monkberry').Compiler;
var loaderUtils = require('loader-utils');
var path = require('path');

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

  if (query.hot) {
    node.add([
      'if(module.hot) {\n',
      'module.hot.accept();\n',
      'require(' + loaderUtils.stringifyRequest(this, '!' + path.join(__dirname, 'update.js')) + ')',
      '(require(' + loaderUtils.stringifyRequest(this, '!!' + request) + '));\n',
      '}\n'
    ]);
  }

  var output = node.toStringWithSourceMap();
  output.map.setSourceContent(request, content);

  this.callback(null, output.code, output.map.toJSON());
};
