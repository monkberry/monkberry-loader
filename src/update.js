var Monkberry = require('monkberry');

var isPatched = false;
var render, stores = [];

function Store(view) {
  this.view = view;
  this.data = {};
}

Store.prototype.handler = function () {
  return {
    get: (target, name) => {
      if (name == 'update') {
        return (data) => {
          this.data = data;
          return this.view.update(data);
        }
      }
      return this.view[name];
    },
    set: (target, name, value) => {
      return this.view[name] = value;
    }
  };
};

module.exports = function (newTemplate) {
  if (!isPatched) {
    // Patch monkberry render
    render = Monkberry.render;
    Monkberry.render = function (template, node, options) {
      var view = render.call(null, template, node, options);
      var store = new Store(view);
      var proxy = new Proxy({}, store.handler());
      stores.push(store); // Save to lists.
      return proxy;
    };
    isPatched = true;
  }

  // Do hot replace of view.
  for (var i = stores.length - 1; i >= 0; i--) {
    var store = stores[i];

    var view = new store.view.constructor();
    var root = store.view.nodes[0];

    // Insert new view.
    view.insertBefore(root);

    // Remove old view.
    store.view.remove();

    // Set new view.
    store.view = view;

    // Default render flow.
    if (view.onRender) {
      view.onRender();
    }

    // Set old view.
    view.update(store.data);
  }
};