var monkberry = require('monkberry');
var Proxy = require('./proxy');

module.exports = function (factory) {
  // Log every rendered proxy view.
  monkberry.__views__ = monkberry.__views__ || {};

  // Patch monkberry render.
  var render = monkberry.render;
  monkberry.render = function (name, data) {
    var view = render.call(monkberry, name, data, true);
    var proxy = new Proxy(view, data);

    // Save to lists.
    monkberry.__views__[name] = monkberry.__views__[name] || [];
    monkberry.__views__[name].push(proxy);

    return proxy;
  };

  // Clear pool.
  monkberry.pool.store = {};

  // Update templates
  monkberry.mount(factory);

  var views = factory(monkberry, document);
  Object.keys(views).forEach(function (name) {
    if(monkberry.__views__[name]) {
      monkberry.__views__[name].forEach(function (proxy) {
        proxy.ref(monkberry._render(name, proxy.data, true));
      });
    }
  });
};