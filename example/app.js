var monkberry = require('monkberry');
monkberry.mount(require('./views/index.monk'));

var view = monkberry.render('index', {
  name: 'world', list: [1, 2, 3, 4]
});

document.body.appendChild(view.dom());
