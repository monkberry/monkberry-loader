# Monkberry loader for webpack

```
npm install monkberry-loader --save
```

## Usage

```js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.monk$/,
        use: [
          {
            loader: 'monkberry-loader',
            options: { /* ... */ }
          }
        ],
      }
    ]
  },
  ...
}
```

## Configuration (optional)

Add `monkberry` options to your `webpack.config.js`:

```js
options: {
  globals: ['window'],
  transforms: [...]
}
```
