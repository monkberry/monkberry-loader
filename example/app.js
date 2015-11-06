var monkberry = require('monkberry');
monkberry.mount(require('./views/index.monk'));

var view = monkberry.render('index', {name: 'world'});
document.body.appendChild(view.dom());
