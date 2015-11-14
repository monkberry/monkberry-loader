module.exports = {
  entry: "./app.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.monk$/,
        loader: '../src/index',
        query: {
          hot: true
        }
      }
    ]
  },
  devtool: 'source-map'
};

// You can safely delete next lines.
// This is only for local development of monkberry-loader.
var fs = require('fs');
var path = require('path');
var src = path.join(__dirname, '../../monkberry');
if (fs.existsSync(src)) {
  module.exports.resolve = {
    alias: {
      monkberry: src
    }
  };
}

