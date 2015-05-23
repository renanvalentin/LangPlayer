'use strict';

module.exports = {
  window: function() {
    return global.window;
  },

  document: function() {
    return global.window.document;
  }
};