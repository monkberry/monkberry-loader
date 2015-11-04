# Monkberry loader for webpack

```
npm install monkberry-loader --save
```

## Usage

```js
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
        loader: 'monkberry-loader'
      }
    ]
  },
  devtool: 'source-map'
};
```
