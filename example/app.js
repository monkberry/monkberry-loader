var monkberry = m = require('monkberry');
monkberry.mount(require('./views/index.monk'));
monkberry.mount(require('./views/part.monk'));

var view = v = monkberry.render('index', {
  name: 'world', list: [1, 2, 3, 4]
});

document.body.appendChild(view.dom());
