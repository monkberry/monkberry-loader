var monkberry = m = require('monkberry');
monkberry.mount(require('./views/index.monk'));
monkberry.mount(require('./views/part.monk'));

var data = {
  name: 'world', list: [1, 2, 3, 4]
};

var view = v = monkberry.render('index', data);

if (module.hot) {
  monkberry.hot(view, data);
}

document.body.appendChild(view.createDocument());
