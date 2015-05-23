'use strict';

class DropHandler {
  constructor(options) {
    this.el = document.querySelector(options.el);

    this.observers = new Map();

    this.events();
  }

  events() {
    this.el.ondragover = function(e) {
      e.preventDefault();
      this.el.className = 'hover';
      return false;
    }.bind(this);

    this.el.ondragleave = function(e) {
      e.preventDefault();
      this.el.className = '';
      return false;
    }.bind(this);

    this.el.ondrop = function(e) {
      e.preventDefault();

      var file = e.dataTransfer.files[0];

      this.publish(file);

      return false;
    }.bind(this);
  }

  subscribe(key, handler) {
    this.observers.set(key, handler);
  }

  unsubscribe(key) {
    this.observers.delete(key);
  }

  publish(file) {
    this.observers.forEach((observer) => {
      observer.onNotify(file);
    });
  }
}
