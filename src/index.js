var Compiler = require('../../monkberry').Compiler;
var loaderUtils = require('loader-utils');
var path = require('path');

module.exports = function (content) {
  this.cacheable();
  var query = loaderUtils.parseQuery(this.query);
  var request = loaderUtils.getCurrentRequest(this);

  var compiler = new Compiler();
  compiler.addSource(request, content);
  var node = compiler.compile(true);

  if (query.hot) {
    node.add([
      'if(module.hot) {\n',
      '		module.hot.accept();\n',
      '   var content = require(' + loaderUtils.stringifyRequest(this, '!!' + request) + ');\n',
      '   var update = require(' + loaderUtils.stringifyRequest(this, '!' + path.join(__dirname, 'hot/update.js')) + ');\n',
      '   update(content);\n',
      '}\n'
    ]);
  }

  var output = node.toStringWithSourceMap();
  output.map.setSourceContent(request, content);

  this.callback(null, output.code, output.map.toJSON());
};
