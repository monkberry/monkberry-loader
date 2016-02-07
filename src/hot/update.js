var monkberry = require('monkberry');
var Proxy = require('./proxy');

var isPatched = false;
var render, views = [];

module.exports = function (factory) {
  if (!isPatched) {
    monkberry.hot = function (view, data) {
      var proxy = new Proxy(view, data);

      // Save to lists.
      views.push(proxy);

      return proxy;
    };
    isPatched = true;
  }

  // Clear pool.
  monkberry.pool.store = {};

  // Update templates
  monkberry.mount(factory);

  for (var i = views.length - 1; i >= 0; i--) {
    var proxy = views[i];
    if (proxy.ref(monkberry.render(proxy.name, undefined, true))) {
      proxy.update(proxy.data);
    } else {
      // Drop proxy from views as them no more persists on page.
      proxy.remove(true);
      views.splice(i, 1);
    }
  }
};