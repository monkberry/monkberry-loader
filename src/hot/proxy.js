function Proxy(view, data) {
  this.view = view;
  this.data = data;

  ['name', 'parent', 'nested', 'nodes', 'wrapped', 'onRender', '__update__'].forEach((name) => {
    Object.defineProperty(this, name, {
      get: () => this.view[name],
      set: (value) => this.view[name] = value
    })
  });
}

Proxy.prototype.ref = function (newView) {
  newView.insertBefore(this.view.nodes[0]);
  this.view.remove(true);
  this.view = newView;
};

Proxy.prototype.dom = function () {
  return this.view.dom();
};

Proxy.prototype.update = function (data) {
  if (this.data) {
    Object.assign(this.data, data);
  } else {
    this.data = data;
  }
  return this.view.update(data);
};

Proxy.prototype.remove = function () {
  return this.view.remove();
};

Proxy.prototype.appendTo = function (node) {
  return this.view.appendTo(node);
};

Proxy.prototype.insertBefore = function (node) {
  return this.view.insertBefore(node);
};

module.exports = Proxy;
