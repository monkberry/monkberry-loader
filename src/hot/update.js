var monkberry = require('monkberry');
var Proxy = require('./proxy');

var isPatched = false;
var render;

module.exports = function (factory, name) {
  if (!isPatched) {
    // Log every rendered proxy view.
    monkberry.__views__ = monkberry.__views__ || {};

    // Patch monkberry render.
    render = monkberry.render;
    monkberry.render = function (name, data) {
      var view = render.call(monkberry, name, data, true);
      var proxy = new Proxy(view, data);

      // Save to lists.
      monkberry.__views__[name] = monkberry.__views__[name] || [];
      monkberry.__views__[name].push(proxy);

      return proxy;
    };

    isPatched = true;
  }

  // Clear pool.
  monkberry.pool.store = {};

  // Update templates
  monkberry.mount(factory);

  if (monkberry.__views__[name]) {
    for (var i = monkberry.__views__[name].length - 1; i >= 0; i--) {
      var proxy = monkberry.__views__[name][i];

      if(proxy.ref(render.call(monkberry, name, undefined, true))) {
        proxy.update(proxy.data);
      } else {
        // Drop proxy from views as them no more persists on page.
        monkberry.__views__[name].splice(i, 1);
      }

    }
  }
};