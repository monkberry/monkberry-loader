# Monkberry loader for webpack

```
npm install monkberry-loader --save
```

## Usage

```js
module.exports = {
  ...
  module: {
    loaders: [
      {
        test: /\.monk$/,
        loader: 'monkberry-loader'
      }
    ]
  },
  ...
};
```

## Configuration 

Add `monkberry` section to your `webpack.config.js`:

```js
monkberry: {
  globals: ['window'],
  transforms: [...]
}
```
