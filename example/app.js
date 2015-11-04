var monkberry = require('../node_modules/monkberry/monkberry');
monkberry.mount(require('./view.monk'));

var view = monkberry.render('view', {name: 'world'});
document.body.appendChild(view.dom());
