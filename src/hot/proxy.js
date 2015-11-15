function Proxy(view, data) {
  this.view = view;
  this.data = data;

  ['name', 'parent', 'nested', 'nodes', 'wrapped', 'onRender', 'onRemove', '__update__'].forEach((name) => {
    Object.defineProperty(this, name, {
      get: () => this.view[name],
      set: (value) => this.view[name] = value
    })
  });
}

Proxy.prototype.ref = function (newView) {
  if (this.view.nodes.length > 0 && presentInDocument(this.view.nodes[0])) {
    newView.insertBefore(this.view.nodes[0]);
    this.view.remove(true);
    this.view = newView;
    return true;
  } else {
    return false;
  }
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

Proxy.prototype.getElementById = function (id) {
  return this.view.getElementById(id);
};

Proxy.prototype.querySelector = function (query) {
  return this.view.querySelector(query);
};

function presentInDocument(node) {
  if (node) {
    if (node.parentNode == window.document) {
      return true;
    } else {
      return presentInDocument(node.parentNode);
    }
  } else {
    return false;
  }
}

module.exports = Proxy;
