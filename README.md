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

## Hot Update

To use hot update add `hot` query param:

```js
loaders: [
  {
    test: /\.monk$/,
    loader: 'monkberry-loader',
    query: {
      hot: true
    }
  }
]
```

## Globals 

You can specify globals in query:

```js
query: {
  globals: ['window']
}
```
