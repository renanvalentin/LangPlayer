'use strict';

const
  window = require('../nw-context.js').window()
  , localStorage = window.localStorage;

const TranslationData = {
  _store: new Map()

  , get: (translation) => {
    return this._store.get(translation);
  }

  , add: (key, translation) => {
    this._store.set(key, translation);

    //this.save();
  }

  , save: () => {
    let store = {};

    this._store.forEach((key, data) => {
      store[data] = key;
    });

    localStorage.setItem('db', JSON.stringify(store));
  }
};

module.exports = TranslationData;
